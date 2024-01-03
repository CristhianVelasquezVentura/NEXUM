import {Component, forwardRef, Input, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgIf, NgClass} from '@angular/common';
import {FileUploadModel} from "@app/core/ui/file-upload/models/file-upload.model";

@Component({
    selector: 'ec-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [NgIf, NgClass]
})
export class FileUploadComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() error: boolean;
    @Input() message: string;
    @Input() accept: string = '.pdf, .jpg, .png';
    @Output() onUpload = new EventEmitter<FileUploadModel>();

    public value: FileUploadModel | null = null;
    public isDisabled: boolean;

    private readonly maxFileSizeBytes: number;

    // File size in bytes equivalent to 3MB
    private readonly THREE_MB_BYTES = 3 * 1024 * 1024;

    constructor() {
        this.error = false;
        this.message = '';
        this.isDisabled = false;

        this.maxFileSizeBytes = this.THREE_MB_BYTES;
    }


    public onChange = (_: any) => {
    }
    public onTouch = () => {
    }

    public processFileInput(input: any): void {
        for (const file of input.target.files) {
            if (file.size >= this.maxFileSizeBytes) {
                this.error = true;
                this.message = 'El peso del archivo no puede ser mayor a 2mb';
                break;
            }
            this.error = false;
            this.message = '';
            this.loadImg(file);
        }
    }

    private loadImg(file: File): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = this._handleReaderLoaded.bind(this, file.name, file.type);
    }

    private _handleReaderLoaded(fileName: string, fileType: string, e: ProgressEvent): void {
        const reader = e.target as FileReader;
        const imageSrc = reader.result as string;
        const type = imageSrc.split(';')[0];
        const base64 = imageSrc.replace(type + ';base64,', '');

        // Created an object right away
        this.value = {
            type: type,
            base64: base64,
            name: fileName,
            extension: fileType
        }
        this.onUpload.emit(this.value);
        this.onTouch();
        this.onChange(this.value);
    }

  writeValue(value: any): void {
    if (value && Object.keys(value).length) {
      this.value = value;
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
