import * as path from 'path';
import { log } from 'console';
import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import { fileURLToPath } from 'node:url';

export function initSNTestEnvironment(glideDeclarationUseRoot:boolean = true, glideDeclarationPath:string = '@types/servicenow', glideDeclarationFileName: string = 'glide.server.d.ts') {
   SNTestEnvironment.getInstance().init(glideDeclarationUseRoot, glideDeclarationPath, glideDeclarationFileName);
}

export class SNTestEnvironment {
    private static instance: SNTestEnvironment;
    private glideDeclarationUseRoot:boolean = true;
    private glideDeclarationPath:string = '@types/servicenow';
    private glideDeclarationFileName: string = 'glide.server.d.ts';

    public modulePath: string = "";

    private constructor() {
        // Private constructor to prevent instantiation
    }

    public static getInstance(): SNTestEnvironment {
        if (!SNTestEnvironment.instance) {
            SNTestEnvironment.instance = new SNTestEnvironment();
        }
        return SNTestEnvironment.instance;
    }

    public static reset(): void {
        const instance = SNTestEnvironment.getInstance();
        instance.glideDeclarationUseRoot = true;
        instance.glideDeclarationPath = '@types/servicenow';
        instance.glideDeclarationFileName = 'glide.server.d.ts';
        instance.modulePath = "";
    }

    public init(glideDeclarationUseRoot:boolean = true, glideDeclarationPath:string = '@types/servicenow', glideDeclarationFileName: string = 'glide.server.d.ts'):void{
        
       this.glideDeclarationUseRoot = glideDeclarationUseRoot;
       this.glideDeclarationPath = glideDeclarationPath;
       this.glideDeclarationFileName = glideDeclarationFileName;
       this.modulePath = "";
        if(glideDeclarationUseRoot){
          
             const rootDir = this.getAppRootDir();//path.dirname(require.main.filename);
             log(`Root dir: ${rootDir}`);
             log(`Glide declaration path: ${this.glideDeclarationPath}`);
             log(`Glide declaration file name: ${this.glideDeclarationFileName}`);
            this.modulePath = path.resolve(rootDir, this.glideDeclarationPath, this.glideDeclarationFileName);
        }else{
            this.modulePath = path.resolve(this.glideDeclarationPath, this.glideDeclarationFileName);
        } 
    }

    private getAppRootDir () {
        const appDir = path.dirname(fileURLToPath(import.meta.url));
        let currentDir = appDir;
        while(!fs.existsSync(path.join(currentDir, 'package.json'))) {
            currentDir = path.join(currentDir, '..')
        }
        return currentDir;
    }
   
   
}
