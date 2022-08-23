import { ObjectIdentify } from "./objectIdentify";

export abstract class AbstractListManager<T extends ObjectIdentify> {

    private modelList: T[] = [];
    private modelAtual: T | null = null;
    private edit: boolean = false;

    public abstract createModel(): T;

    public getModelList(): T[] {
        return this.modelList;
    }

    public setModelList(modelList: T[]) {
        this.modelList = modelList;
    }

    public getModelAtual(): T | null {
        return this.modelAtual;
    }

    public isEdit(): boolean {
        return this.edit;
    }

    public reset(): void {
        this.modelAtual = null;
        this.edit = false;
    }

    public novo(): void {
        this.modelAtual = this.createModel();
        this.edit = true;
    }

    public add(model: T): void {
        this.modelList.push(model);
    }

    public editar(model: T) {
        this.modelAtual = model;
        this.edit = true;
    }

    public update(model: T) {
        let modelExistente = this.modelList.find(obj =>
            model.id === obj.id)

        if (modelExistente != null) {
            Object.assign(modelExistente, model);
        }
    }

    public remove(model: T) {
        const modelExistente = this.modelList.find(obj => model.id === obj.id)

        if (modelExistente != null) {
            const listaRemove: T[] = this.modelList.filter(obj => obj.id !== modelExistente.id);
            this.modelList = listaRemove;
        }

    }
}