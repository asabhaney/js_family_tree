// Game of Thrones family tree (https://en.wikipedia.org/wiki/Game_of_Thrones)
// file created by djBirdman (https://github.com/djBirdman)
export const data = {
    "start": "benjenstark1",
    "persons": {
        "benjenstark1": { "id": "benjenstark1", "name": "Benjen Stark", "birthyear": 84, "deathyear": "101-121", "own_unions": ["uBenjenLysa"] },
        "lysalocke1": { "id": "lysalocke1", "name": "Lysa Locke", "birthyear": 84, "own_unions": ["uBenjenLysa"] },
        "rickonstark1": { "id": "rickonstark1", "name": "Rickon Stark", "birthyear": 96, "deathyear": 121, "own_unions": ["uRickonGilliane"], "parent_union": "uBenjenLysa" },
        "bennardstark1": { "id": "bennardstark1", "name": "Bennard Stark", "birthyear": 105, "deathyear": 126, "own_unions": ["uBennardMargaret"], "parent_union": "uBenjenLysa" },
        "gillianeglover1": { "id": "gillianeglover1", "name": "Lady Gilliane Glover", "birthyear": 96, "deathyear": 109, "own_unions": ["uRickonGilliane"] },
        "margaretcarstark1": { "id": "margaretcarstark1", "name": "Margaret Karstark", "birthyear": 112, "own_unions": ["uBennardMargaret"] },
        "creganstark1": { "id": "creganstark1", "name": "Cregan Stark", "birthyear": 108, "deathyear": "157-196", "own_unions": ["uCreganArra", "uCreganAlysanne", "uCreganLynara"], "parent_union": "uRickonGilliane" },
        "benjenstark2": { "id": "benjenstark2", "name": "Benjen Stark", "birthyear": 124, "own_unions": [], "parent_union": "uBennardMargaret" },
        "brandonstark1": { "id": "brandonstark1", "name": "Brandon Stark", "birthyear": 125, "own_unions": [], "parent_union": "uBennardMargaret" },
        "elricstark1": { "id": "elricstark1", "name": "Elric Stark", "birthyear": 126, "own_unions": [], "parent_union": "uBennardMargaret" },
        "arranorrey1": { "id": "arranorrey1", "name": "Arra Norrey", "birthyear": 116, "deathyear": 128, "own_unions": ["uCreganArra"] },
        "alysanneblackwood1": { "id": "alysanneblackwood1", "name": "Alysanne Blackwood", "birthyear": 113, "deathyear": "136-179", "own_unions": ["uCreganAlysanne"] },
        "lynarastark1": { "id": "lynarastark1", "name": "Lynara Stark", "own_unions": ["uCreganLynara"] },
        "rickonstark2": { "id": "rickonstark2", "name": "Rickon Stark", "birthyear": 128, "deathyear": 157, "own_unions": ["uRickonJeyne"], "parent_union": "uCreganArra" },
        "sarrastark1": { "id": "sarrastark1", "name": "Sarra Stark", "birthyear": 133, "own_unions": [], "parent_union": "uCreganAlysanne" },
        "alysstark1": { "id": "alysstark1", "name": "Alys Stark", "birthyear": 134, "own_unions": [], "parent_union": "uCreganAlysanne" },
        "rayastark1": { "id": "rayastark1", "name": "Raya Stark", "birthyear": 135, "own_unions": [], "parent_union": "uCreganAlysanne" },
        "mariahstark1": { "id": "mariahstark1", "name": "Mariah Stark", "birthyear": 136, "own_unions": [], "parent_union": "uCreganAlysanne" },
        "jonnelstark1": { "id": "jonnelstark1", "name": "Jonnel Stark", "birthyear": 136, "deathyear": "157-209", "own_unions": ["uJonnelStark1Inbreed", "uJonnelRobyn"], "parent_union": "uCreganLynara" },
        "jonnelstark1inbreednote": { "id": "jonnelstark1inbreednote", "name": "Jonnel married half-brother Rickon's d. Sansa", "own_unions": [], "parent_union": "uJonnelStark1Inbreed" },
        "jonnelstark1inbreed": { "id": "jonnelstark1inbreed", "name": "Jonnel Stark", "birthyear": 136, "deathyear": "157-209", "own_unions": ["uJonnelSansa"] },
        "edricstark1": { "id": "edricstark1", "name": "Edric Stark", "birthyear": 137, "deathyear": "153-209", "own_unions": ["uEdricStark1Inbreed"], "parent_union": "uCreganLynara" },
        "edricstark1inbreednote": { "id": "edricstark1inbreednote", "name": "Edric married half-brother Rickon's d. Serena", "own_unions": [], "parent_union": "uEdricStark1Inbreed" },
        "edricstark1inbreed": { "id": "edricstark1inbreed", "name": "Edric Stark", "birthyear": 137, "deathyear": "153-209", "own_unions": ["uEdricSerena"] },
        "lyannastark1": { "id": "lyannastark1", "name": "Lyanna Stark", "birthyear": 138, "own_unions": [], "parent_union": "uCreganLynara" },
        "barthoganstark1": { "id": "barthoganstark1", "name": "Barthogan Stark", "birthyear": 139, "deathyear": "184-209", "own_unions": [], "parent_union": "uCreganLynara" },
        "brandonstark2": { "id": "brandonstark2", "name": "Brandon Stark", "birthyear": 140, "deathyear": "184-212", "own_unions": ["uBrandonWylla", "uBrandonAlys"], "parent_union": "uCreganLynara" },
        "robynryswell1": { "id": "robynryswell1", "name": "Robyn Ryswell", "birthyear": 141, "own_unions": ["uJonnelRobyn"] },
        "jeynemanderly1": { "id": "jeynemanderly1", "name": "Jeyne Manderly", "own_unions": ["uRickonJeyne"] },
        "wyllafenn1": { "id": "wyllafenn1", "name": "Wylla Fenn", "own_unions": ["uBrandonWylla"] },
        "alyskarstark1": { "id": "alyskarstark1", "name": "Alys Karstark", "own_unions": ["uBrandonAlys"] },
        "sansastark1": { "id": "sansastark1", "name": "Sansa Stark", "birthyear": 140, "own_unions": ["uJonnelSansa"], "parent_union": "uRickonJeyne" },
        "sansastark1inbreed": { "id": "sansastark1inbreed", "name": "Sansa Stark (see Rickon Stark)", "birthyear": 140, "own_unions": ["uJonnelStark1Inbreed"] },
        "serenastark1": { "id": "serenastark1", "name": "Serena Stark", "birthyear": 141, "own_unions": ["uEdricSerena", "uJonSerena"], "parent_union": "uRickonJeyne" },
        "serenastark1inbreed": { "id": "serenastark1inbreed", "name": "Serena Stark (see Rickon Stark)", "birthyear": 141, "own_unions": ["uEdricStark1Inbreed"] },
        "jonumber1": { "id": "jonumber1", "name": "Jon Umber", "own_unions": ["uJonSerena"] },
        "cregardstark1": { "id": "cregardstark1", "name": "Cregard Stark", "birthyear": 162, "own_unions": [], "parent_union": "uEdricSerena" },
        "torrhenstark1": { "id": "torrhenstark1", "name": "Torrhen Stark", "birthyear": 162, "own_unions": [], "parent_union": "uEdricSerena" },
        "arranastark1": { "id": "arranastark1", "name": "Arrana Stark", "birthyear": 163, "own_unions": ["uOsricArrana"], "parent_union": "uEdricSerena" },
        "aragellestark1": { "id": "aragellestark1", "name": "Aragelle Stark", "birthyear": 164, "own_unions": ["uRobardAregelle"], "parent_union": "uEdricSerena" },
        "lonnelsnow1": { "id": "lonnelsnow1", "name": "Lonnel Snow", "birthyear": 1, "own_unions": [], "parent_union": "uBrandonWylla" },
        "rodwellstark1": { "id": "lonnelsnow1", "name": "Rodwell Stark", "birthyear": 170, "deathyear": "184-212", "own_unions": ["uRodwellMyriame"], "parent_union": "uBrandonAlys" },
        "beronstark1": { "id": "lonnelsnow1", "name": "Beron Stark", "birthyear": 172, "deathyear": 212, "own_unions": ["uBeronLorra"], "parent_union": "uBrandonAlys" },
        "arsastark1": { "id": "lonnelsnow1", "name": "Arsa Stark", "birthyear": 173, "own_unions": [], "parent_union": "uBrandonAlys" },
        "osricumber1": { "id": "osricumber1", "name": "Osric Umber", "birthyear": 160, "own_unions": ["uOsricArrana"] },
        "robardcerwyn1": { "id": "robardcerwyn1", "name": "Robard Cerwyn", "own_unions": ["uRobardAregelle"] },
        "myriamemanderly1": { "id": "myriamemanderly1", "name": "Myriame Manderly", "own_unions": ["uRodwellMyriame"] },
        "lorraroyce1": { "id": "lorraroyce1", "name": "Lorra Royce", "own_unions": ["uBeronLorra"] },
        "unknown1": { "id": "unknown1", "name": "Unknown", "own_unions": [], "parent_union": "uOsricArrana" },
        "unknown2": { "id": "unknown2", "name": "Unknown", "own_unions": [], "parent_union": "uRobardAregelle" },
        "donnorstark1": { "id": "donnorstark1", "name": "Donnor Stark", "birthyear": 194, "deathyear": "212-226", "own_unions": [], "parent_union": "uBeronLorra" },
        "willamstark1": { "id": "willamstark1", "name": "Willam Stark", "birthyear": 195, "deathyear": 226, "own_unions": ["uWillamLyanne", "uWillamMelantha"], "parent_union": "uBeronLorra" },
        "artosstark1": { "id": "artosstark1", "name": "Artos Stark", "birthyear": 196, "own_unions": ["uArtosLysara"], "parent_union": "uBeronLorra" },
        "berenastark1": { "id": "berenastark1", "name": "Berena Stark", "birthyear": 197, "own_unions": [], "parent_union": "uBeronLorra" },
        "alysannestark1": { "id": "alysannestark1", "name": "Alysanne Stark", "birthyear": 198, "own_unions": [], "parent_union": "uBeronLorra" },
        "erroldstark1": { "id": "erroldstark1", "name": "Errold Stark", "birthyear": 199, "own_unions": [], "parent_union": "uBeronLorra" },
        "rodrikstark1": { "id": "rodrikstark1", "name": "Rodrik Stark", "birthyear": 200, "own_unions": ["uRodrikArya"], "parent_union": "uBeronLorra" },
        "lyanneglover1": { "id": "lyanneglover1", "name": "Lyanne Glover", "deathyear": 206, "own_unions": ["uWillamLyanne"] },
        "melanthablackwood1": { "id": "melanthablackwood1", "name": "Melantha Blackwood", "own_unions": ["uWillamMelantha"] },
        "lysarakarstark1": { "id": "lysarakarstark1", "name": "Lysara Karstark", "own_unions": ["uArtosLysara"] },
        "aryaflint1": { "id": "aryaflint1", "name": "Arya Flint", "own_unions": ["uRodrikArya"] },
        "brandonstark3": { "id": "brandonstark3", "name": "Brandon Stark", "birthyear": 206, "deathyear": 209, "own_unions": [], "parent_union": "uWillamLyanne" },
        "edwylestark1": { "id": "edwylestark1", "name": "Edwyle Stark", "birthyear": 208, "own_unions": ["uEdwyleMarna"], "parent_union": "uWillamMelantha" },
        "jocelynstark1": { "id": "jocelynstark1", "name": "Jocelyn Stark", "birthyear": 209, "own_unions": ["uBenedictJocelyn"], "parent_union": "uWillamMelantha" },
        "brandonstark4": { "id": "brandonstark4", "name": "Brandon Stark", "birthyear": 210, "own_unions": ["uBrandonUnknown"], "parent_union": "uArtosLysara" },
        "benjenstark3": { "id": "benjenstark3", "name": "Benjen Stark", "birthyear": 210, "own_unions": ["uBenjenUnknown"], "parent_union": "uArtosLysara" },
        "brandastark1": { "id": "brandastark1", "name": "Branda Stark", "birthyear": 220, "own_unions": ["uHarroldBranda"], "parent_union": "uRodrikArya" },
        "lyarrastark1": { "id": "lyarrastark1", "name": "Lyarra Stark", "birthyear": 221, "own_unions": ["uLyarraStark1Inbreed"], "parent_union": "uRodrikArya" },
        "lyarrastark1inbreednote": { "id": "lyarrastark1inbreednote", "name": "Lyarra married cousin Edwyle's son Rickard", "own_unions": [], "parent_union": "uLyarraStark1Inbreed" },
        "lyarrastark1inbreed": { "id": "lyarrastark1inbreed", "name": "Lyarra Stark", "birthyear": 136, "deathyear": "157-209", "own_unions": ["uRickardLyarra"] },
        "marnalocke1": { "id": "marnalocke1", "name": "Marna Locke", "own_unions": ["uEdwyleMarna"] },
        "benedictjoyce1": { "id": "benedictjoyce1", "name": "Benedict Joyce", "own_unions": ["uBenedictJocelyn"] },
        "harroldrogers1": { "id": "harroldrogers1", "name": "Harrold Rogers", "own_unions": ["uHarroldBranda"] },
        "rickardstark1": { "id": "rickardstark1", "name": "Rickard Stark", "birthyear": 238, "deathyear": 282, "own_unions": ["uRickardLyarra"], "parent_union": "uEdwyleMarna" },
        "rickardstark1inbreed": { "id": "rickardstark1inbreed", "name": "Rickard Stark (see Willam Stark > Edwyle Stark)", "birthyear": 238, "deathyear": 282, "own_unions": ["uLyarraStark1Inbreed"] },
        "unknown3": { "id": "unknown3", "name": "Unknown Daughter", "birthyear": 230, "own_unions": [], "parent_union": "uBenedictJocelyn" },
        "unknown4": { "id": "unknown4", "name": "Unknown Daughter", "birthyear": 232, "own_unions": [], "parent_union": "uBenedictJocelyn" },
        "unknown5": { "id": "unknown5", "name": "Unknown Daughter", "birthyear": 234, "own_unions": [], "parent_union": "uBenedictJocelyn" },
        "unknown6mother": { "id": "unknown6mother", "name": "Unknown", "own_unions": ["uBrandonUnknown"] },
        "unknown6": { "id": "unknown6", "name": "Unknown", "own_unions": [], "parent_union": "uBrandonUnknown" },
        "unknown7mother": { "id": "unknown7mother", "name": "Unknown", "own_unions": ["uBenjenUnknown"] },
        "unknown7": { "id": "unknown7", "name": "Unknown", "own_unions": [], "parent_union": "uBenjenUnknown" },
        "brandonstark5": { "id": "brandonstark5", "name": "Brandon Stark", "birthyear": 262, "deathyear": 282, "own_unions": [], "parent_union": "uRickardLyarra" },
        "eddardstark1": { "id": "eddardstark1", "name": "Eddard Stark", "birthyear": 263, "deathyear": 299, "own_unions": ["uEddardUnknown", "uEddardCatelyn"], "parent_union": "uRickardLyarra" },
        "lyannastark2": { "id": "lyannastark2", "name": "Lyanna Stark", "birthyear": 266, "deathyear": 283, "own_unions": [], "parent_union": "uRickardLyarra" },
        "benjenstark4": { "id": "benjenstark4", "name": "Benjen Stark", "birthyear": 267, "own_unions": [], "parent_union": "uRickardLyarra" },
        "catelyntully1": { "id": "catelyntully1", "name": "Catelyn Tully", "birthyear": 264, "deathyear": 299, "own_unions": ["uEddardCatelyn"] },
        "unknown8": { "id": "unknown8", "name": "Unknown", "own_unions": ["uEddardUnknown"] },
        "jonsnow1": { "id": "jonsnow1", "name": "Jon Snow", "birthyear": 283, "own_unions": [], "parent_union": "uEddardUnknown" },
        "robbstark1": { "id": "robbstark1", "name": "Robb Stark", "birthyear": 283, "deathyear": 299, "own_unions": [], "parent_union": "uEddardCatelyn" },
        "sansastark2": { "id": "sansastark2", "name": "Sansa Stark", "birthyear": 286, "own_unions": [], "parent_union": "uEddardCatelyn" },
        "aryastark1": { "id": "aryastark1", "name": "Arya Stark", "birthyear": 289, "own_unions": [], "parent_union": "uEddardCatelyn" },
        "branstark1": { "id": "branstark1", "name": "Bran Stark", "birthyear": 290, "own_unions": [], "parent_union": "uEddardCatelyn" },
        "rickonstark3": { "id": "rickonstark3", "name": "Rickon Stark", "birthyear": 295, "own_unions": [], "parent_union": "uEddardCatelyn" },
    },
    "unions": {
        "uBenjenLysa": { "id": "uBenjenLysa", "partner": ["benjenstark1", "lysalocke1"], "children": ["rickonstark1", "bennardstark1"], "unionYear": 1 },
        "uRickonGilliane": { "id": "uRickonGilliane", "partner": ["rickonstark1", "gillianeglover1"], "children": ["creganstark1"], "unionYear": 1 },
        "uBennardMargaret": { "id": "uBennardMargaret", "partner": ["bennardstark1", "margaretcarstark1"], "children": ["benjenstark2", "brandonstark1", "elricstark1"], "unionYear": 1 },
        "uCreganArra": { "id": "uCreganArra", "partner": ["creganstark1", "arranorrey1"], "children": ["rickonstark2"], "unionYear": 126 },
        "uCreganAlysanne": { "id": "uCreganAlysanne", "partner": ["creganstark1", "alysanneblackwood1"], "children": ["sarrastark1", "alysstark1", "rayastark1", "mariahstark1"], "unionYear": 132 },
        "uCreganLynara": { "id": "uCreganLynara", "partner": ["creganstark1", "lynarastark1"], "children": ["jonnelstark1", "edricstark1", "lyannastark1", "barthoganstark1", "brandonstark2"], "unionYear": 136 },
        "uRickonJeyne": { "id": "uRickonJeyne", "partner": ["rickonstark2", "jeynemanderly1"], "children": ["sansastark1", "serenastark1"], "unionYear": 1 },
        "uJonnelStark1Inbreed": { "id": "uJonnelStark1Inbreed", "partner": ["jonnelstark1", "sansastark1inbreed"], "children": ["jonnelstark1inbreednote"], "unionYear": 150 },
        "uJonnelSansa": { "id": "uJonnelSansa", "partner": ["jonnelstark1inbreed", "sansastark1"], "unionYear": 150 },
        "uJonnelRobyn": { "id": "uJonnelRobyn", "partner": ["jonnelstark1", "robynryswell1"], "unionYear": 151 },
        "uEdricStark1Inbreed": { "id": "uEdricStark1Inbreed", "partner": ["edricstark1", "serenastark1inbreed"], "children": ["edricstark1inbreednote"], "unionYear": 162 },
        "uEdricSerena": { "id": "uEdricSerena", "partner": ["edricstark1inbreed", "serenastark1"], "children": ["cregardstark1", "torrhenstark1", "arranastark1", "aragellestark1"], "unionYear": 162 },
        "uBrandonWylla": { "id": "uBrandonWylla", "partner": ["brandonstark2", "wyllafenn1"], "children": ["lonnelsnow1"], "unionYear": 152 },
        "uBrandonAlys": { "id": "uBrandonAlys", "partner": ["brandonstark2", "alyskarstark1"], "children": ["rodwellstark1", "beronstark1", "arsastark1"], "unionYear": 153 },
        "uJonSerena": { "id": "uJonSerena", "partner": ["jonumber1", "serenastark1"], "unionYear": 161 },
        "uOsricArrana": { "id": "uOsricArrana", "partner": ["arranastark1", "osricumber1"], "children": ["unknown1"], "unionYear": 1 },
        "uRobardAregelle": { "id": "uRobardAregelle", "partner": ["aragellestark1", "robardcerwyn1"], "children": ["unknown2"], "unionYear": 1 },
        "uRodwellMyriame": { "id": "uRodwellMyriame", "partner": ["rodwellstark1", "myriamemanderly1"], "unionYear": 1 },
        "uBeronLorra": { "id": "uBeronLorra", "partner": ["beronstark1", "lorraroyce1"], "children": ["donnorstark1", "willamstark1", "artosstark1", "berenastark1", "alysannestark1", "erroldstark1", "rodrikstark1"], "unionYear": 1 },
        "uWillamLyanne": { "id": "uWillamLyanne", "partner": ["willamstark1", "lyanneglover1"], "children": ["brandonstark3"], "unionYear": 204 },
        "uWillamMelantha": { "id": "uWillamMelantha", "partner": ["willamstark1", "melanthablackwood1"], "children": ["edwylestark1", "jocelynstark1"], "unionYear": 207 },
        "uArtosLysara": { "id": "uArtosLysara", "partner": ["artosstark1", "lysarakarstark1"], "children": ["brandonstark4", "benjenstark3"], "unionYear": 2 },
        "uRodrikArya": { "id": "uRodrikArya", "partner": ["rodrikstark1", "aryaflint1"], "children": ["brandastark1", "lyarrastark1"], "unionYear": 2 },
        "uEdwyleMarna": { "id": "uEdwyleMarna", "partner": ["edwylestark1", "marnalocke1"], "children": ["rickardstark1"], "unionYear": 2 },
        "uBenedictJocelyn": { "id": "uBenedictJocelyn", "partner": ["benedictjoyce1", "jocelynstark1"], "children": ["unknown3", "unknown4", "unknown5"], "unionYear": 2 },
        "uBrandonUnknown": { "id": "uBrandonUnknown", "partner": ["brandonstark4", "unknown6mother"], "children": ["unknown6"], "unionYear": 2 },
        "uBenjenUnknown": { "id": "uBenjenUnknown", "partner": ["benjenstark3", "unknown7mother"], "children": ["unknown7"], "unionYear": 2 },
        "uHarroldBranda": { "id": "uHarroldBranda", "partner": ["harroldrogers1", "brandastark1"], "unionYear": 2 },
        "uLyarraStark1Inbreed": { "id": "uLyarraStark1Inbreed", "partner": ["rickardstark1inbreed", "lyarrastark1"], "children": ["lyarrastark1inbreednote"], "unionYear": 2 },
        "uRickardLyarra": { "id": "uRickardLyarra", "partner": ["rickardstark1", "lyarrastark1inbreed"], "children": ["brandonstark5", "eddardstark1", "lyannastark2", "benjenstark4"], "unionYear": 2 },
        "uEddardUnknown": { "id": "uEddardUnknown", "partner": ["eddardstark1", "unknown8"], "children": ["jonsnow1"], "unionYear": 282 },
        "uEddardCatelyn": { "id": "uEddardCatelyn", "partner": ["eddardstark1", "catelyntully1"], "children": ["robbstark1", "sansastark2", "aryastark1", "branstark1", "rickonstark3"], "unionYear": 283 },
    },
    "links": [
        ["benjenstark1", "uBenjenLysa"],
        ["lysalocke1", "uBenjenLysa"],
        ["uBenjenLysa", "rickonstark1"],
        ["uBenjenLysa", "bennardstark1"],
        ["rickonstark1", "uRickonGilliane"],
        ["gillianeglover1", "uRickonGilliane"],
        ["bennardstark1", "uBennardMargaret"],
        ["margaretcarstark1", "uBennardMargaret"],
        ["uRickonGilliane", "creganstark1"],
        ["uBennardMargaret", "benjenstark2"],
        ["uBennardMargaret", "brandonstark1"],
        ["uBennardMargaret", "elricstark1"],
        ["creganstark1", "uCreganArra"],
        ["arranorrey1", "uCreganArra"],
        ["creganstark1", "uCreganAlysanne"],
        ["alysanneblackwood1", "uCreganAlysanne"],
        ["creganstark1", "uCreganLynara"],
        ["lynarastark1", "uCreganLynara"],
        ["uCreganArra", "rickonstark2"],
        ["uCreganAlysanne", "sarrastark1"],
        ["uCreganAlysanne", "alysstark1"],
        ["uCreganAlysanne", "rayastark1"],
        ["uCreganAlysanne", "mariahstark1"],
        ["uCreganLynara", "jonnelstark1"],
        ["uCreganLynara", "edricstark1"],
        ["uCreganLynara", "lyannastark1"],
        ["uCreganLynara", "barthoganstark1"],
        ["uCreganLynara", "brandonstark2"],
        ["rickonstark2", "uRickonJeyne"],
        ["jeynemanderly1", "uRickonJeyne"],
        ["uRickonJeyne", "sansastark1"],
        ["uRickonJeyne", "serenastark1"],
        ["jonnelstark1", "uJonnelStark1Inbreed"],
        ["sansastark1inbreed", "uJonnelStark1Inbreed"],
        ["uJonnelStark1Inbreed", "jonnelstark1inbreednote"],
        ["jonnelstark1inbreed", "uJonnelSansa"],
        ["sansastark1", "uJonnelSansa"],
        ["jonnelstark1", "uJonnelRobyn"],
        ["robynryswell1", "uJonnelRobyn"],
        ["jonumber1", "uJonSerena"],
        ["serenastark1", "uJonSerena"],
        ["edricstark1", "uEdricStark1Inbreed"],
        ["serenastark1inbreed", "uEdricStark1Inbreed"],
        ["uEdricStark1Inbreed", "edricstark1inbreednote"],
        ["edricstark1inbreed", "uEdricSerena"],
        ["serenastark1", "uEdricSerena"],
        ["brandonstark2", "uBrandonWylla"],
        ["wyllafenn1", "uBrandonWylla"],
        ["brandonstark2", "uBrandonAlys"],
        ["alyskarstark1", "uBrandonAlys"],
        ["uEdricSerena", "cregardstark1"],
        ["uEdricSerena", "torrhenstark1"],
        ["uEdricSerena", "arranastark1"],
        ["uEdricSerena", "aragellestark1"],
        ["uBrandonWylla", "lonnelsnow1"],
        ["uBrandonAlys", "rodwellstark1"],
        ["uBrandonAlys", "beronstark1"],
        ["uBrandonAlys", "arsastark1"],
        ["arranastark1", "uOsricArrana"],
        ["osricumber1", "uOsricArrana"],
        ["uOsricArrana", "unknown1"],
        ["aragellestark1", "uRobardAregelle"],
        ["robardcerwyn1", "uRobardAregelle"],
        ["uRobardAregelle", "unknown2"],
        ["rodwellstark1", "uRodwellMyriame"],
        ["myriamemanderly1", "uRodwellMyriame"],
        ["beronstark1", "uBeronLorra"],
        ["lorraroyce1", "uBeronLorra"],
        ["uBeronLorra", "donnorstark1"],
        ["uBeronLorra", "willamstark1"],
        ["uBeronLorra", "artosstark1"],
        ["uBeronLorra", "berenastark1"],
        ["uBeronLorra", "alysannestark1"],
        ["uBeronLorra", "erroldstark1"],
        ["uBeronLorra", "rodrikstark1"],
        ["willamstark1", "uWillamLyanne"],
        ["lyanneglover1", "uWillamLyanne"],
        ["uWillamLyanne", "brandonstark3"],
        ["willamstark1", "uWillamMelantha"],
        ["melanthablackwood1", "uWillamMelantha"],
        ["uWillamMelantha", "edwylestark1"],
        ["uWillamMelantha", "jocelynstark1"],
        ["artosstark1", "uArtosLysara"],
        ["lysarakarstark1", "uArtosLysara"],
        ["uArtosLysara", "brandonstark4"],
        ["uArtosLysara", "benjenstark3"],
        ["rodrikstark1", "uRodrikArya"],
        ["aryaflint1", "uRodrikArya"],
        ["uRodrikArya", "brandastark1"],
        ["uRodrikArya", "lyarrastark1"],
        ["edwylestark1", "uEdwyleMarna"],
        ["marnalocke1", "uEdwyleMarna"],
        ["uEdwyleMarna", "rickardstark1"],
        ["benedictjoyce1", "uBenedictJocelyn"],
        ["jocelynstark1", "uBenedictJocelyn"],
        ["uBenedictJocelyn", "unknown3"],
        ["uBenedictJocelyn", "unknown4"],
        ["uBenedictJocelyn", "unknown5"],
        ["brandonstark4", "uBrandonUnknown"],
        ["unknown6mother", "uBrandonUnknown"],
        ["uBrandonUnknown", "unknown6"],
        ["benjenstark3", "uBenjenUnknown"],
        ["unknown7mother", "uBenjenUnknown"],
        ["uBenjenUnknown", "unknown7"],
        ["harroldrogers1", "uHarroldBranda"],
        ["brandastark1", "uHarroldBranda"],
        ["rickardstark1inbreed", "uLyarraStark1Inbreed"],
        ["lyarrastark1", "uLyarraStark1Inbreed"],
        ["uLyarraStark1Inbreed", "lyarrastark1inbreednote"],
        ["rickardstark1", "uRickardLyarra"],
        ["lyarrastark1inbreed", "uRickardLyarra"],
        ["uRickardLyarra", "brandonstark5"],
        ["uRickardLyarra", "eddardstark1"],
        ["uRickardLyarra", "lyannastark2"],
        ["uRickardLyarra", "benjenstark4"],
        ["eddardstark1", "uEddardUnknown"],
        ["unknown8", "uEddardUnknown"],
        ["uEddardUnknown", "jonsnow1"],
        ["eddardstark1", "uEddardCatelyn"],
        ["catelyntully1", "uEddardCatelyn"],
        ["uEddardCatelyn", "robbstark1"],
        ["uEddardCatelyn", "sansastark2"],
        ["uEddardCatelyn", "aryastark1"],
        ["uEddardCatelyn", "branstark1"],
        ["uEddardCatelyn", "rickonstark3"],
    ]
};