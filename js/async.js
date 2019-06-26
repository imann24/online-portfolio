var BlockingCallback = function(callback, flags)
{
     this.callback = callback;
     if(flags)
     {
          this.flags = flags;
     }
     else
     {
          this.flags = [];
     }
     this.running = false;
};

BlockingCallback.prototype.run = function()
{
     this.running = true;
};

BlockingCallback.prototype.addFlag = function(flag)
{
     this.flags.push(flag);
};

BlockingCallback.prototype.removeFlag = function(flag)
{
     this.flags.splice(this.flags.indexOf(flag), 1);
     this.checkToRunCallback();
};

BlockingCallback.prototype.checkToRunCallback = function()
{
     if(this.running && this.flags.length == 0)
     {
          this.callback();
     }
};
