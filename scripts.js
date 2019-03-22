

//     player_name = "a_magic"
//     player_name_plus = player_name.replace("_", "+")
//     console.log(player_name)
//     proxyurl = "https://cors-anywhere.herokuapp.com/";
//     // console.log(document.getElementById("searchbox").value)
//     $.ajax({

//         url: proxyurl + "https://secure.runescape.com/m=hiscore/ranking?table=26&category_type=1&time_filter=0&date=1553122420303&user=" + player_name_plus,
//         dataType: 'text',
//         success: function(data) {
//             // console.log(data)
//                 alert("processing runescore")
//                 data = data.toLowerCase()
//                 var partsarray = data.split('http://services.runescape.com/m=hiscore/compare?user1=' + player_name_plus + '&amp;category_type=1">')

//                 var data_string = (partsarray[partsarray.length-1])
//                 var anotherpartsarray = data_string.split('</a')
//                 var runescore = anotherpartsarray[0]
//                 console.log(runescore)
//                 console.log(data)
//                 // loadRunescore(runescore)
//              }
        
//    });


var skill_array = [
    [0, 'Attack'],
    [1, 'Defence'],
    [2, 'Strength'],
    [3, 'Constitution'],
    [4, 'Ranged'],
    [5, 'Prayer'],
    [6, 'Magic'],
    [7, 'Cooking'],
    [8, 'Woodcutting'],
    [9, 'Fletching'],
    [10, 'Fishing'],
    [11, 'Firemaking'],
    [12, 'Crafting'],
    [13, 'Smithing'],
    [14, 'Mining'],
    [15, 'Herblore'],
    [16, 'Agility'],
    [17, 'Thieving'],
    [18, 'Slayer'],
    [19, 'Farming'],
    [20, 'Runecrafting'],
    [21, 'Hunter'],
    [22, 'Construction'],
    [23, 'Summoning'],
    [24, 'Dungeoneering'],
    [25, 'Divination'],
    [26, 'Invention'],
    ];
    // var skill_map = new Map(skill_array);
    // console.log(skill_array[5][1])
    

function populate(){
        player_name = document.getElementById("searchbox").value
        player_name_plus = player_name.replace("_", "+")
        player_name_plus =  player_name_plus.replace(" ", "+")

        console.log(player_name)
        proxyurl = "https://cors-anywhere.herokuapp.com/";
        // console.log(document.getElementById("searchbox").value)
        $.ajax({
        dataType:'json',
        url: proxyurl + "https://apps.runescape.com/runemetrics/profile/profile?user=" + player_name + "&activities=20",
        type: 'GET',
        success: function(res) {
                loadData(res);
            
        },
        error : function(request, error) {
            console.log("Request: "+JSON.stringify(request))
        }
    });
    $.ajax({

        url: proxyurl + "https://secure.runescape.com/m=hiscore/ranking?table=26&category_type=1&time_filter=0&date=1553122420303&user=" + player_name_plus,
        dataType: 'text',
        success: function(data) {
            // console.log(data)
                // alert("processing runescore")
                data = data.toLowerCase()
                var partsarray = data.split('http://services.runescape.com/m=hiscore/compare?user1=' + player_name_plus + '&amp;category_type=1">')
                // alert(partsarray.length)
                var data_string = (partsarray[partsarray.length-1])
                var anotherpartsarray = data_string.split('</a')
                var runescore = anotherpartsarray[0]
                // console.log(runescore)
                if(runescore.length > 10){
                    return;
                }
                loadRunescore(runescore)
             }
        
   });
    }
// Create the XHR object.

function loadRunescore(data){
    document.getElementById("runescore").innerHTML = "Runescore: " + data
}

function loadData(res_dict){
    if (!(res_dict['name'])){
        alert("User not found")
        return;
    }

    var xp = res_dict['totalxp']
    xp = xp.toLocaleString('en')
    document.getElementById("username").innerHTML = (res_dict['name'])
 
    document.getElementById("avatar").src = "http://secure.runescape.com/m=avatar-rs/" + player_name + "/chat.png"


    document.getElementById("overallname").innerHTML = 'Overall'
    document.getElementById("overallrank").innerHTML = (res_dict['rank'])
    document.getElementById("overalllevel").innerHTML = (res_dict['totalskill'])
    document.getElementById("overallxp").innerHTML = xp

    var stats_dict = {};
    
    for(i=0; i<27; i++){
        var skill_finder = res_dict['skillvalues'][i].id;
        stats_dict[i] = {
        skill_id: res_dict['skillvalues'][i],
        skill_level: res_dict['skillvalues'][i]['level'],
        skill_xp: res_dict['skillvalues'][i]['xp'],
        skill_rank: res_dict['skillvalues'][i]['rank'],
        skill_name: skill_array[skill_finder][1],

        }

        document.getElementById(skill_array[skill_finder][1] + 'name').innerHTML = skill_array[skill_finder][1]
        document.getElementById(skill_array[skill_finder][1] + 'level').innerHTML = res_dict['skillvalues'][i]['level']

        // changing to commas
        var exp = res_dict['skillvalues'][i]['xp']
        exp = (exp-(exp%10))/10;
        exp = exp.toLocaleString('en')
        
        document.getElementById(skill_array[skill_finder][1] + 'xp').innerHTML = exp
        document.getElementById(skill_array[skill_finder][1] + 'rank').innerHTML = res_dict['skillvalues'][i]['rank']
    }
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
