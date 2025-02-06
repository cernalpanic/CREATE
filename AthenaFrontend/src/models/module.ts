export class Module {

    public ModuleID: string;
    public Name: string;
    public Color: string;
    public Description: string;

    constructor(module: any)
    {
      if (module.moduleID || module.ModuleID){
        this.ModuleID = module.moduleID || module.ModuleID;
        this.Name = module.name || module.Name;
        this.Color = module.color || module.Color;
        this.Description = module.description || module.Description;
      } else {
        this.ModuleID = '00000000-0000-0000-0000-000000000000';
        this.Name = '';
        this.Color = '000000';
        this.Description = '';
      }
    }
}
