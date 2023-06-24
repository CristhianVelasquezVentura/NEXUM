import {Component, OnInit, forwardRef, Input, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {

  @Input() label = '';
  @Input() inputLabel = '';
  @Input() infoText = '';
  @Input() helpText = '';
  @Input() error: boolean;
  @Input() message: string;
  @Input() icon = '';
  @Input() accept: string = '.pdf, .jpg, .png';
  @Output() onSelected = new EventEmitter<any>();
  public currentValue: string;
  public isDisabled: boolean;
  private maxValueFile: number;
  private imageSrcNow: string;
  private extension: string = '';

  constructor() {
    this.error=false;
    this.message='';
    this.currentValue='';
    this.isDisabled=false;
    this.maxValueFile=0;
    this.imageSrcNow='';
  }

  ngOnInit(): void {
    this.maxValueFile = 3145728;
    this.icon = this.icon === '' ? 'upload white-base' : this.icon;
  }

  public onChange = (_: any) => {
  }

  public onTouch = () => {
  }

  public newValue(value: any): void {
    for (const file of value.target.files) {
      if (file.size >= this.maxValueFile) {
        this.error = true;
        this.message = 'El peso del archivo no puede ser mayor a 2mb';
        break;
      }
      this.error = false;
      this.message = '';
      this.infoText = file.name;
      this.extension = file.type
      this.loadImg(file);
    }
  }

  private loadImg(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => reader.result;
    reader.onloadend = this._handleReaderLoaded.bind(this);
  }

  private _handleReaderLoaded(e:any): void {
    const reader = e.target;
    this.imageSrcNow = reader.result;

    const type = this.imageSrcNow.split(';')[0];
    this.currentValue = this.imageSrcNow.replace(type + ';base64,', '');
    this.onSelected.emit({
      name: this.infoText,
      value: this.currentValue,
      extension: this.extension
    })
    this.onTouch();
    this.onChange(this.currentValue);
  }

  writeValue(value: any): void {
    if (value) {
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


}
