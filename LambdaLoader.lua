local repo = 'https://raw.githubusercontent.com/violin-suzutsuki/LinoriaLib/main/'
local Library = loadstring(game:HttpGet(repo .. 'Library.lua'))()

local games = {
    [142823291] = "https://projectlambda.3b1m.org/mm2.lua",
    [98629859043211] = "https://projectlambda.3b1m.org/meg.lua",
    [99078474560152] = "https://projectlambda.3b1m.org/meg.lua"
}

local function loadGameScript()
    local currentPlaceId = game.PlaceId
    local scriptUrl = games[currentPlaceId]

    if scriptUrl then
        Library:Notify("projectlambda.net | Game Detected, script loading...", 5)
        
        local success, err = pcall(function()
            loadstring(game:HttpGet(scriptUrl))()
        end)

        if not success then
            Library:Notify("projectlambda.net | Error, script couldn't loaded.", 5)
        end
    else
        Library:Notify("projectlambda.net | Unsupported game, script couldn't found.", 5)
    end
end

loadGameScript()
