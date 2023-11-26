import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FilesService {

    private subjectFile: Subject<string> = new Subject<string>();

    constructor() {
    }

    public readFileText(file: File): Observable<string> {

        this.subjectFile = new Subject<string>();

        const reader: FileReader = new FileReader();

        reader.readAsText(file);
        reader.onload = this._handleEncryptReaderLoad.bind(this);

        return this.subjectFile.asObservable();
    }

    public readFileBase64(file: File): Observable<string> {

        this.subjectFile = new Subject<string>();

        const reader: FileReader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = this._handleEncryptReaderLoad.bind(this);

        return this.subjectFile.asObservable();
    }

    private _handleEncryptReaderLoad(e: ProgressEvent<FileReader>): void {

        try {
            this.subjectFile.next(e?.target?.result as string);
            //this.subjectFile.complete();
        } catch (error: any) {
            this.subjectFile.error(error);
            //this.subjectFile.complete();
        }
    }

}
