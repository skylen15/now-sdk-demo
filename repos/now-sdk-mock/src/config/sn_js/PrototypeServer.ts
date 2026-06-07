type RhinoConstructor = ((...args: unknown[]) => void) & Record<string, unknown>;
type ObjectExtensions = ObjectConstructor & {
  extend(destination: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown>;
  extendsObject(destination: { prototype: Record<string, unknown> }, source: Record<string, unknown>): RhinoConstructor;
  clone(obj: Record<string, unknown>): RhinoConstructor;
};

const Class = {
    create: function(): RhinoConstructor {
      return function(this: { initialize?: (...args: unknown[]) => void }, ...args: unknown[]) {
          /* This anonymous function will execute in the scope of the caller
             in interpreted mode. The initalize method is a utility we provide
             for giving a hook into the creation of a script include in scope.
             Many global script includes do not have an initialize function, and
             therefore we should only call this.initialize when present.
           */
          if (this.initialize) this.initialize(...args);
      } as RhinoConstructor;
    }
  };
const extendedObject = Object as ObjectExtensions;
  
  /* 
   * Old method left here for compatibility purposes. All future extension should use "extendsObject" method.
   */
  extendedObject.extend = function(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
  }
  
  extendedObject.extendsObject = function(destination, source) {
    const clone = extendedObject.clone(destination.prototype);
    
    for (var property in source) {
      clone[property] = source[property];
    }
    return clone;
  }
  extendedObject.clone = function(obj) {
    var clone = Class.create();
      
    for (var property in obj) {
      clone[property] = obj[property];
    }
      
    return clone;
  }

export default Class;
