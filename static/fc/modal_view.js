function setTimes(start, end){
    if(start == null){
        start = new Date();
        end = new Date();

        var nowHH = start.getHours();
        var nowMM = start.getMinutes();

        if(nowMM < 30){
            start.setHours(nowHH, 30, 0, 0, 0);
            end.setHours(nowHH + 1, 0, 0, 0, 0);
        }else{
            start.setHours(nowHH + 1, 0, 0, 0);
            end.setHours(nowHH + 1, 30, 0, 0, 0);
        }
    }else if(end == null){
        end = new Date(start);
        end.setHours(start.getHours()+1, start.getMinutes(), 0, 0, 0);
    }
    
    $('#i-sHH').val("" + start.getHours()).prop("selected", true);
    $('#i-sMM').val("" + start.getMinutes()).prop("selected", true);
    $('#i-eHH').val("" + end.getHours()).prop("selected", true);
    $('#i-eMM').val("" + end.getMinutes()).prop("selected", true);

    stimeChanged();
}

function daysOfMonth(year, month){
    return 32 - new Date(year, month-1, 32).getDate();
}

function setDate(date){
    if(date == null){
        date = new Date();
    }
    var now_y = (new Date()).getFullYear();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    $('#i-YYYY').remove();
    $('#i-YYYY-td').append('<select class="custom-select" id="i-YYYY" name="yyyy"></select>');
    $('#i-YYYY').append('<option value="'+now_y+'" selected>'+now_y+'</option>');
    $('#i-YYYY').append('<option value="'+(now_y + 1)+'">'+(now_y + 1)+'</option>');

    $('#i-MM').val("" + m).prop("selected", true);

    $('#i-DD').remove();
    $('#i-DD-td').append('<select class="custom-select" id="i-DD" name="dd"></select>');
    var days = daysOfMonth(y, m);
    for(var i=0; i<days; i++){
        $('#i-DD').append('<option value="'+(i + 1)+'">'+(i + 1)+'</option>');
    }
    $('#i-DD').val("" + d).prop("selected", true);
}

function monthChanged(){
    var y = parseInt($('#i-YYYY option:selected').val());
    var m = parseInt($('#i-MM option:selected').val());
    var days = daysOfMonth(y, m);

    $('#i-DD').remove();
    $('#i-DD-td').append('<select class="custom-select" id="i-DD" name="dd"></select>');
    for(var i=0; i<days; i++){
        $('#i-DD').append('<option value="'+(i + 1)+'">'+(i + 1)+'</option>');
    }
    $('#i-DD').val("1").prop("selected", true);
}

function stimeChanged(){
    var h = parseInt($('#i-sHH option:selected').val());
    var m = parseInt($('#i-sMM option:selected').val());
    if(m > 0){
        h = h + 1;
    }

    $('#i-eHH').remove();
    $('#i-eHH-td').append('<select class="custom-select" id="i-eHH" name="eh"></select>');
    for(var i=h; i<=24; i++){
        if(i < 10){
            $('#i-eHH').append('<option value="'+i+'">0'+i+'</option>');
        }else{
            $('#i-eHH').append('<option value="'+i+'">'+i+'</option>');
        }
    }
    $('#i-eHH').val("" + h).prop("selected", true);
}

function viewAction(info){
    var obj = info.event;

    $('#formModalLabel').text("Edit Object");
    $('#i-btnGen').hide();
    $('#i-btnUpd').show();
    $('#i-btnDel').show();

    $('#i-id').attr("value", obj.id);
    $('#i-title').attr("value", obj.title);
    $('#i-chief').attr("value", obj.extendedProps.chief);
    $('#i-numPerson').val(obj.extendedProps.people).prop("selected", true);
    $('#i-noOutsider').prop("checked", (obj.extendedProps.outsider != "True"));
    setDate(obj.start);
    setTimes(obj.start, obj.end);
    $('#i-note').text(obj.extendedProps.note);

    $('#formModal').modal('show');
}

function addAction() {
    $('#formModalLabel').text("Add Object");
    $('#i-btnGen').show();
    $('#i-btnUpd').hide();
    $('#i-btnDel').hide();

    $('#i-id').attr("value", "");
    $('#i-title').attr("value", "");
    $('#i-chief').attr("value", "");
    $('#i-numPerson').val("2").prop("selected", true);
    $('#i-noOutsider').prop("checked", false);
    setDate(null);
    setTimes(null, null);
    $('#i-note').text("");

    $('#formModal').modal('show');
}