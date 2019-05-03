// populate()           
var data_array = [
    [0, 'Overall'],
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


function populate() {

    player_name = document.getElementById("searchbox").value
    // player_name = "zee_pk"

    // player_name_plus = player_name.replace("", "+")
    player_name = player_name.replace(" ", "_")

    console.log(player_name)
    proxyurl = "https://cors-anywhere.herokuapp.com/";

    //gathers stats, minigame data
    $.ajax({
        dataType: 'text',
        url: proxyurl + "https://secure.runescape.com/m=hiscore/index_lite.ws?player=" + player_name,
        type: 'GET',
        success: function (res) {
            loadData(res, player_name)
            $.ajax({
                dataType:'json',
                url: proxyurl + "https://apps.runescape.com/runemetrics/profile/profile?user=" + player_name + "&activities=20",
                type: 'GET',
                success: function(res) {
                        try {
                            loadActivities(res);
                        } catch (error) {
                            clearActivities();
                            alert("User's RuneMetrics profile is set to private. Activity may not display.")
                        }
                    
                },
                error : function(request, error) {
                    console.log("Request: "+JSON.stringify(request))
                }
            });
        },
        error: function (request, error) {
            alert("Player not found")
        }
    });

    //gathers activity log data


}


function loadData(res, player_name) {
    console.log("running data for " + player_name)
    var skills = {}
    var minigames = {}
    var temp_data_array = res.split("\n")
    for (i = 0; i < 28; i++) {
        var individual_skill_array = temp_data_array[i].split(",")
        xp = individual_skill_array[2]
        xp = parseInt(xp, 10)
        skills[i] = {
            id: i,
            name: data_array[i][1],
            rank: individual_skill_array[0],
            level: individual_skill_array[1],
            xp: xp.toLocaleString('en')
        }

    }
    for (i = 28; i < 57; i++) {
        var individual_minigame_array = temp_data_array[i].split(",")
        score = individual_minigame_array[1]
        score = parseInt(score, 10)
        minigames[i] = {
            id: i,
            name: data_array[i][1],
            rank: individual_minigame_array[0],
            score: score.toLocaleString('en')
        }

    }
    for (i = 0; i < 28; i++) {
        document.getElementById(i + 'name').innerHTML = skills[i].name
        document.getElementById(i + 'level').innerHTML = skills[i].level
        document.getElementById(i + 'rank').innerHTML = skills[i].rank
        document.getElementById(i + 'xp').innerHTML = skills[i].xp

    }


    // document.getElementById("static-info").style.visibility = "visible";
    document.getElementById("username").innerHTML = player_name.replace('_', ' ')
    document.getElementById("avatar").src = "http://secure.runescape.com/m=avatar-rs/" + player_name + "/chat.png"
    document.getElementById("runescore").innerHTML = minigames[52].score
    document.getElementById("runescore-rank").innerHTML = minigames[52].rank
    document.getElementById("total-xp").innerHTML = skills[0].xp
    document.getElementById("total-xp-rank").innerHTML = skills[0].rank
    var profile_info = document.getElementById("profile-info")
    profile_info.style.visibility = "visible"


    var stat_table = document.getElementById("stat-table")
    stat_table.style.display = "block"

}


function loadActivities (res_dict){
    for (j = 0; j < 20; j++) {
        // console.log(res_dict['activities'][j]['text'])
        act_text = res_dict['activities'][j]['text']
        var xp_index = act_text.indexOf('XP')
        if (xp_index > 0){
            sub_1 = act_text.substring(0,xp_index-6)
            sub_2 = act_text.substring(xp_index+2,act_text.length)
            act_text = sub_1 + 'm XP' + sub_2
        }
        document.getElementById('activity' + j).innerHTML = act_text 
        document.getElementById('activity' + j).setAttribute("title", res_dict['activities'][j]['date'])
    }
    var activity_table = document.getElementById("activity-table")
    activity_table.style.display = "block"

}

function clearActivities(){
    var activity_table = document.getElementById("activity-table")
    activity_table.style.display = "none"
}

function create_table() {
    var table = document.getElementById("stat-table")
    // var overall = table.appendChild(document.createElement("td"))
    // overall.id = "overall"
 
    for (i = 0; i < 28; i++) {
        table.appendChild(document.createElement("tr"))
        var x = table.appendChild(document.createElement("td"))
        x.id = i + 'name'
        var t = table.appendChild(document.createElement("td"))
        t.id = i + 'level'
        var y = table.appendChild(document.createElement("td"))
        y.id = i + 'xp'
        var z = table.appendChild(document.createElement("td"))
        z.id = i + 'rank'
        // table.appendChild(document.createElement("tr"))
        // table.appendChild(document.createElement("td")).innerHTML = stats_dict[i].skill_name
        // table.appendChild(document.createElement("td")).innerHTML = stats_dict[i].skill_xp
        // table.appendChild(document.createElement("td")).innerHTML = stats_dict[i].skill_rank

    }
    document.getElementById('0name').style = "font-weight:bold;"
    document.getElementById('0name').style = "font-weight:bold;"
    document.getElementById('0name').style = "font-weight:bold;"
    document.getElementById('0name').style = "font-weight:bold;"

    var activity = document.getElementById("activity-table")
    for (i = 0; i < 20; i++) {
        activity.appendChild(document.createElement("tr"))
        var n = activity.appendChild(document.createElement("td"))
        n.id = 'activity' + i
    }

}
