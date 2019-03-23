populate()
var data_array = [
    [0, 'Overall']
    [1, 'Attack'],
    [2, 'Defence'],
    [3, 'Strength'],
    [4, 'Constitution'],
    [5, 'Ranged'],
    [6, 'Prayer'],
    [7, 'Magic'],
    [8, 'Cooking'],
    [9, 'Woodcutting'],
    [10, 'Fletching'],
    [11, 'Fishing'],
    [12, 'Firemaking'],
    [13, 'Crafting'],
    [14, 'Smithing'],
    [15, 'Mining'],
    [16, 'Herblore'],
    [17, 'Agility'],
    [18, 'Thieving'],
    [19, 'Slayer'],
    [20, 'Farming'],
    [21, 'Runecrafting'],
    [22, 'Hunter'],
    [23, 'Construction'],
    [24, 'Summoning'],
    [25, 'Dungeoneering'],
    [26, 'Divination'],
    [27, 'Invention'],
    [28, 'Bounty Hunter'],
    [29, 'BH: Rogue'],
    [30, 'Dominion Tower'],
    [31, 'The Crucible'],
    [32, 'Castle Wars'],
    [33, 'BA: Attacker'],
    [34, 'BA: Defender'],
    [35, 'BA: Collector'],
    [36, 'BA: Healer'],
    [37, 'Duel Tournament'],
    [38, 'Mobilizing Armies'],
    [39, 'Conquest'],
    [40, 'Fist of Guthix'],
    [41, 'GG: Resource Race'],
    [42, 'GG: Athletics'],
    [43, 'WE2: Armadyl Lifetime'],
    [44, 'WE2: Bandos Lifetime'],
    [45, 'WE2: Armadyl PvP Kills'],
    [46, 'WE2: Bandos PvP Kills'],
    [47, 'Heist Guard Level'],
    [48, 'Heist Robber Level'],
    [49, 'CFP 5 Game Average'],
    [50, 'UNK'],
    [51, 'UNK'],
    [52, 'Runescore'],
    [53, 'Easy Clues'],
    [54, 'Medium Clues'],
    [55, 'Hard Clues'],
    [56, 'Elite Clues'],
    [57, 'Master Clues'],
    ];
    // var skill_map = new Map(skill_array);
    // console.log(skill_array[5][1])
    

function populate(){
        // player_name = document.getElementById("searchbox").value
        player_name = "zee pk"
        player_name_plus = player_name.replace("_", "+")
        player_name_plus =  player_name_plus.replace(" ", "+")

        console.log(player_name)
        proxyurl = "https://cors-anywhere.herokuapp.com/";
        // console.log(document.getElementById("searchbox").value)
        $.ajax({
        dataType:'text',
        url: proxyurl + "https://secure.runescape.com/m=hiscore/index_lite.ws?player=" + player_name,
        type: 'GET',
        success: function(res) {
                console.log(res)
                
            
        },
        error : function(request, error) {
            console.log("Request: "+JSON.stringify(request))
        }
    });
    }
// Create the XHR object.



function loadData(res){
    var skills = {}
    var minigames = {}
    var data_array = res.split("\n")
    for(i=0;i<28;i++){
        var individual_skill_array = data_array[i].split(",")
        skills[i] = {
            id: i,
            name: skill_array[i],
            rank: individual_skill_array[0],
            level: individual_skill_array[1],
            xp: individual_skill_array[2],
        }    
    }
    for(i=28;i<57;i++){
        var individual_minigame_array = data_array[i].split(",")
        minigames[i] = {
            id: i,
            name: skill_array[i],
            score: minigame_skill_array[0],
            rank: minigame_skill_array[1],

        }    
    }
    for(i=0;i<skills.length;i++){
        console.log(skills[i].name + ": " + skills[i].xp)
    }

    var xp = res_dict['totalxp']
    xp = xp.toLocaleString('en')
    document.getElementById("username").innerHTML = document.getElementById("searchbox").value
 
    document.getElementById("avatar").src = "http://secure.runescape.com/m=avatar-rs/" + player_name + "/chat.png"


    
    var stat_table = document.getElementById("stat-table")
    var activity_table = document.getElementById("activity-table")
    stat_table.style.display = "block"
    activity_table.style.display = "block"
    for(j=0;j<20;j++){
        // console.log(res_dict['activities'][j]['text'])
        document.getElementById('activity'+j).innerHTML = res_dict['activities'][j]['text']
        document.getElementById('activity'+j).setAttribute("title", res_dict['activities'][j]['date'])
    }
}
function create_table(){
    var table = document.getElementById("stat-table")
    // var overall = table.appendChild(document.createElement("td"))
    // overall.id = "overall"
    var oa = table.appendChild(document.createElement("tr"))
    
    var x = table.appendChild(document.createElement("td"))
    x.id = 'overallname'
    x.style = "font-weight:bold;"
    var t = table.appendChild(document.createElement("td"))
    t.id = 'overalllevel'
    t.style = "font-weight:bold;"
    var y = table.appendChild(document.createElement("td"))
    y.id = 'overallxp'
    y.style = "font-weight:bold;"
    var z = table.appendChild(document.createElement("td"))
    z.id = 'overallrank'
    z.style = "font-weight:bold;"
        for(i=0;i<27;i++){
            table.appendChild(document.createElement("tr"))
            var x = table.appendChild(document.createElement("td"))
            x.id = skill_array[i][1] + 'name'
            var t = table.appendChild(document.createElement("td"))
            t.id = skill_array[i][1] + 'level'
            var y = table.appendChild(document.createElement("td"))
            y.id = skill_array[i][1] + 'xp'
            var z = table.appendChild(document.createElement("td"))
            z.id = skill_array[i][1] + 'rank'
            // table.appendChild(document.createElement("tr"))
            // table.appendChild(document.createElement("td")).innerHTML = stats_dict[i].skill_name
            // table.appendChild(document.createElement("td")).innerHTML = stats_dict[i].skill_xp
            // table.appendChild(document.createElement("td")).innerHTML = stats_dict[i].skill_rank

        }
    var activity = document.getElementById("activity-table")
        for(i=0;i<20;i++){
            activity.appendChild(document.createElement("tr"))
            var n = activity.appendChild(document.createElement("td"))
            n.id = 'activity' + i
        }

}
