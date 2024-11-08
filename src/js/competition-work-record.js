new Dropdown(document.querySelector(`.selectBuseo`))
new Dropdown(document.querySelector(`.selectRole`))

new Datepicker(document.querySelector(`.dpApplyStart`)); // 대회기간 시작일
new Datepicker(document.querySelector(`.dpApplyEnd`)); // 대회기간 종료일


// 첨부파일
$(".fileBox .btn-blue-border").click(function() {
    $("#file").click();
})

$("#file").change(function() {
    let fileValue = $("#file").val().split("\\")
    $(".fileBox .inputBox-default").val(fileValue[fileValue.length-1])
})

$(".fileBox .remove").click(function() {
    $("#file").val("");
    $(".fileBox .inputBox-default").val("");
})