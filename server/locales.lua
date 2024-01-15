local file = io.open(("%s/locales/fr.json"):format(GetResourcePath(GetCurrentResourceName())), "r")
if not file then return end
local content = file:read("*a")
file:close()
locales = json.decode(content)
