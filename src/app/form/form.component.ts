import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SectorDto } from '../_dto/sectorDto';
import { UserDto } from '../_dto/userDto';
import { UserService } from '../_service/person.service';
import { SectorService } from '../_service/sector.service';
import { nameValidator } from '../_validators/name.validator';
import { SnackbarComponent } from '../snackbar/snackbar.component';

import {MatSnackBar} from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private sectorService : SectorService,
              private userService: UserService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) { }

  form: FormGroup;
  sectorGroup: SectorDto[];

  primarySelect: number;
  primaryLevelSectors: SectorDto[];

  topSelect: number[];
  topLevelSectors: SectorDto[];

  midSelect: number[];
  midLevelSectors: SectorDto[];

  lowSelect: number[];
  lowLevelSectors: SectorDto[];


  ngOnInit(): void {
    this.initForm();
    this.fetchPrimarySectors();  
  }

  filterTopSectors() {
    if (!this.isEmpty(this.primarySelect)) {
      this.topSelect = [];
      this.midSelect = [];
      this.lowSelect = [];
    }
    this.sectorService.getSectorsByParentId(this.primarySelect).subscribe(
      res => {
        this.topLevelSectors = res;
      }
    );
  }

  filterMidSectors() {
    if (!this.isEmpty(this.topSelect)) {
      this.lowSelect = [];
      this.midSelect = [];
    }
    const midObservables = [];
    this.topSelect.forEach(c => {
      midObservables.push(this.sectorService.getSectorsByParentId(c))
    });
    const midSelected: SectorDto[] = [];
    forkJoin(midObservables).subscribe(function (res) {
      res.forEach(function (array: SectorDto[]) {
        array.forEach(function (sectorDto: SectorDto) {
          midSelected.push(sectorDto);
        })
      })
    });
    this.midLevelSectors = midSelected;
  }

  filterLowSectors() {
    if (!this.isEmpty(this.midSelect)) {
      this.lowSelect = [];
    }

    const lowObservables = [];
    this.midSelect.forEach(c => {
      lowObservables.push(this.sectorService.getSectorsByParentId(c))
    });
    
    const lowSelected: SectorDto[] = []
    forkJoin(lowObservables).subscribe(function (res) {
      res.forEach(function (array: SectorDto[]) {
        array.forEach(function (sectorDto: SectorDto) {
          lowSelected.push(sectorDto);
        })
      })
    });
    this.lowLevelSectors = lowSelected;
  }

  isEmpty(val: any): boolean {
    return (val == "" || val == null || val == NaN);
  }

  addUser(): void {  
    var sectorsIds = this.handleListOfSectors();
    
    const dto = new UserDto(
      this.form.value.name,
      this.form.value.acceptTerms,
      sectorsIds
    );
    
    var dataString: string;
    this.userService.addUser(dto).then(function (res) {
      dataString = new String(res.id).concat(",").concat(res.username);
    }).then(() => {  
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: dataString,
        duration: 7000
      })
    });
    this.resetFormData();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, nameValidator()]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  private fetchPrimarySectors() {
    this.sectorService.getSectorByType('primary').subscribe(
      res => {
        this.primaryLevelSectors = res;
      }
    );
  }

  resetFormData() {
    this.form.reset();
    this.primarySelect = 0;
    this.topSelect = null;
    this.midSelect = null;
    this.lowSelect = null;
  }

  private handleListOfSectors(): Array<number> {
    var parsedList : Array<number> = [];

    this.topSelect.forEach(function (top) {
      if (!Number.isNaN(top)) {
        parsedList.push(top);
      }
    });
    
    this.midSelect.forEach(function (mid) {
      if (!Number.isNaN(mid)) {
        parsedList.push(mid);
      }
    });

    this.lowSelect.forEach(function (low) {
      if (!Number.isNaN(low)) {
        parsedList.push(low);
      }
    });
    
    return parsedList;
  }
}
