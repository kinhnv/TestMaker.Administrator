export class PageHelper {
    constructor(private module: string) { }

    get isCreatingPage(): boolean {
        return location.href.indexOf(`${this.module}-creating`) >= 0;
    }

    get isDetailsPage(): boolean {
        return location.href.indexOf(`${this.module}-details`) >= 0;
    }

    get isEditingPage(): boolean {
        return location.href.indexOf(`${this.module}-editing`) >= 0;
    }

    getListPage(): string {
        return `${this.module}-list`;
    }

    getCreatingPage(): string {
        return `${this.module}-creating`;
    }

    getDetailsPage(id: string): string {
        return `${this.module}-details/${id}`;
    }

    getEditingPage(id: string): string {
        return `${this.module}-editing/${id}`;
    }
}
