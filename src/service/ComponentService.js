class ComponentService
{
  requestFile = (event) =>
  {
    const fb = event.target.querySelector("input");

    if(fb)
      fb.click();
  }

  downloadFile = (content, filename, contentType) =>
  {
    const data = content instanceof Blob ? content :
        new Blob([content], {type: contentType});
    const a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(data)
    a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
    a.click();
  }

  setController = (key, controller) =>
  {
    dataMap[key].controller = controller;
  }

  getComponentData = (key) =>
  {
    const c = dataMap[key];
    return c ? c : createComponentData(key, "windowContent", "Invalid", true);
  }

  isComponentActive = (key) =>
  {
    const c = dataMap[key];
    return (c && c.type === "windowContent" && c.active) ? true : false;
  }

  getKeys = () =>
  {
    return Object.keys(dataMap);
  }

  openWindow = (key) =>
  {
    const cd = dataMap[key];

    if(cd)
    {
      cd.active = true;
      cd.showContent = true;
      cd.showHintText = false;
      this.callMethod("windowList", "updateActiveWindowList");
    }
  }

  toggleHintText = (key) =>
  {
    const cd = dataMap[key];

    if(cd)
      cd.showHintText = !cd.showHintText;
  }

  toggleContent = (key) =>
  {
    const cd = dataMap[key];

    if(cd)
      cd.showContent = !cd.showContent;
  }

  closeWindow = (key) =>
  {
    const cd = dataMap[key];

    if(cd?.canClose)
    {
      cd.active = false;
      cd.controller = null;
      this.callMethod("windowList", "updateActiveWindowList");
    }
  }

  callMethod = (key, methodName) =>
  {
    const controller = dataMap[key]?.controller;
    const method = controller ? controller[methodName] : null;

    if(method)
      method();
  }

  forceFocusToElement = (event, code, elementId) =>
  {
    if(event.altKey && event.code === code)
    {
      event.stopPropagation();
      const element = document.getElementById(elementId);

      if(element)
        element.focus();
    }
  }

  executeKeyEvent = (codeMap, altKey, event, callback) =>
  {
    if(codeMap && event && event.altKey === altKey)
    {
      const keys = Object.keys(codeMap);

      for(let i = 0; i < keys.length; i++)
      {
        if(event.code === codeMap[keys[i]])
        {
          callback(keys[i]);
          break;
        }
      }
    }
  }

  onElementValueChange = (event, obj, methodName, extras) =>
  {
    if(obj)
    {
      const v = event?.target?.value;
      const method = obj[methodName];
      event.target.value = v;

      if(method)
        method(v, extras);
    }
  }

  onElementDecimalValueChange = (event, obj, methodName, extras) =>
  {
    if(obj)
    {
      const v = event?.target?.value?.replace(/\D/g, "");
      const method = obj[methodName];
      event.target.value = v;

      if(method)
        method(v, extras);
    }
  }

  constructor()
  {
    dataMap = createDefaultDataMap();
  }
}


const createDefaultDataMap = () =>
{
  const ccd = createComponentData;
  const wc = "windowContent";
  const map = {};
  map.footer = ccd("footer", "other", "Footer", false, true);
  map.header = ccd("header", "other", "Header", false, true);
  map.windowList = ccd("windowList", "other", "Window List", false, true);
  map.manager = ccd("manager", wc, "Editor Manager", false, true);
  map.zoom = ccd("zoom", wc, "Zoom Manager", true, false);
  map.randomizer = ccd("randomizer", wc, "Seed Randomizer", true, false);
  map.patch = ccd("patch", wc, "Patch Manager", true, false);
  map.health = ccd("health", wc, "Character Health Editor", true, false);
  map.food = ccd("food", wc, "Food Heal Editor", true, false);
  map.level = ccd("level", wc, "Level Editor", true, false);
  map.pallete = ccd("pallete", wc, "Pallete Editor", true, false);
  map.damage = ccd("damage", wc, "Character Damage Editor", true, false);
  map.order = ccd("order", wc, "Stage Order Editor", true, false);
  map.modification = ccd("modification", wc, "Modification Manager", true, false);
  return map;
}

const createComponentData = (key, type, title, canClose, active, component) =>
{
  const showContent = true;
  const showHintText = false;
  return {key, type, title, canClose, active, showContent, showHintText, component};
}

let dataMap;


export const componentService = new ComponentService();