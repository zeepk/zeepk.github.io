
  var os_data_array= [
    [0, 'Overall'],
    [1, 'Attack'],
    [2, 'Defence'],
    [3, 'Strength'],
    [4, 'Hitpoints'],
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
    [24, 'BH Hunter'],
    [25, 'BH Rogues'],
    [26, 'Total Clues'],
    [27, 'Easy Clues'],
    [28, 'Medium Clues'],
    [29, 'Hard Clues'],
    [30, 'Elite Clues'],
    [31, 'Master Clues'],
    [32, 'LMS Rank'],
  ];
  // var skill_map = new Map(skill_array);
  // console.log(skill_array[5][1])
  
  
  function populate() {
  
    document.getElementById("loading").style.visibility = "visible";
  
    var player_name = document.getElementById("searchbox").value
    // player_name = "zee_pk"
  
    // player_name_plus = player_name.replace("", "+")
    player_name = player_name.replace(" ", "_")
  
    console.log(player_name)
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
  
    // gathers stats, minigame data
    $.ajax({
        dataType: 'text',
        url: proxyurl + "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=" + player_name,
        type: 'GET',
        success: function (res) {
            loadData(res, player_name)
            
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
    for (var i = 0; i < 24; i++) {
        var individual_skill_array = temp_data_array[i].split(",")
        var xp = individual_skill_array[2]
        xp = parseInt(xp, 10)
        skills[i] = {
            id: i,
            name: os_data_array[i][1],
            rank: individual_skill_array[0],
            level: individual_skill_array[1],
            xp: xp.toLocaleString('en')
        }
  
    }
    for (i = 24; i < 32; i++) {
        var individual_minigame_array = temp_data_array[i].split(",")
        var score = individual_minigame_array[1]
        score = parseInt(score, 10)
        minigames[i] = {
            id: i,
            name: os_data_array[i][1],
            rank: individual_minigame_array[0],
            score: score.toLocaleString('en')
        }
        // console.log(minigames[i].name)
  
    }
    for (i = 0; i < 24; i++) {
        document.getElementById(i + 'name').innerHTML = skills[i].name
        document.getElementById(i + 'level').innerHTML = skills[i].level
        document.getElementById(i + 'rank').innerHTML = skills[i].rank
        document.getElementById(i + 'xp').innerHTML = skills[i].xp
  
    }
    for (i=0; i<8; i++) {
        document.getElementById(i + 'activity_name').innerHTML = minigames[i].name
        document.getElementById(i + 'activity_score').innerHTML = minigames[i].score
        document.getElementById(i + 'activity_rank').innerHTML = minigames[i].rank
    }
  
  
    // document.getElementById("static-info").style.visibility = "visible";
    document.getElementById("username").innerHTML = player_name.replace('_', ' ')

    document.getElementById("total-xp").innerHTML = skills[0].xp
    document.getElementById("total-xp-rank").innerHTML = skills[0].rank
    var profile_info = document.getElementById("profile-info")
    profile_info.style.visibility = "visible"
  
  
    var stat_table = document.getElementById("stat-table")
    stat_table.style.display = "block"
  
    document.getElementById("loading").style.visibility = "hidden";
    
  }
  
  
  function loadActivities (res_dict){
    for (var j = 0; j < 8; j++) {
        // console.log(res_dict['activities'][j]['text'])
        var act_text = res_dict['activities'][j]['text']
        var xp_index = act_text.indexOf('XP')
        if (xp_index > 0){
            var sub_1 = act_text.substring(0,xp_index-6)
            var sub_2 = act_text.substring(xp_index+2,act_text.length)
            act_text = sub_1 + 'm XP' + sub_2
        }
        document.getElementById('activity' + j).innerHTML = act_text 
        document.getElementById('activity' + j).setAttribute("title", res_dict['activities'][j]['date'])
    }
    var activity_table = document.getElementById("activity-table")
    activity_table.style.display = "block"
  
  }

  
  function create_table(){
    var table = document.getElementById("stat-table")
    // var overall = table.appendChild(document.createElement("td"))
    // overall.id = "overall"
    console.log("hello")
    for (var i = 0; i < 24; i++) {
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
    for (i = 0; i < 8; i++) {
        // activity.appendChild(document.createElement("tr"))
        // var n = activity.appendChild(document.createElement("td"))
        // n.id = 'activity' + i
        activity.appendChild(document.createElement("tr"))
        var x = activity.appendChild(document.createElement("td"))
        x.id = i + 'activity_name'
        var t = activity.appendChild(document.createElement("td"))
        t.id = i + 'activity_score'
        var y = activity.appendChild(document.createElement("td"))
        y.id = i + 'activity_rank'    
    }
  
}