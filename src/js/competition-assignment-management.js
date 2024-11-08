
new TabContent(document.querySelector('.tabs-assign'))
new Datepicker(document.querySelector(`.dpApplyStart`)); // 대회기간 시작일
new Datepicker(document.querySelector(`.dpApplyEnd`)); // 대회기간 종료일

// 대회배정 모달 탭별 부서 셀렉트
const selects1 = document.querySelectorAll('.tab1Buseo') ?? []; 
const selects2 = document.querySelectorAll('.tab2Buseo') ?? []; 
const selects3 = document.querySelectorAll('.tab3Buseo') ?? []; 

// 셀렉트 명은 .tab + 탭 순서 + Buseo + 탭별 셀렉트 순서(0부터 시작)
// .tab1Buseo0, .tab1Buseo1 ...
selects1.forEach((el,i)=>{
    new Dropdown(document.querySelector(`.tab1Buseo${i}`));
})
selects2.forEach((el,i)=>{
    new Dropdown(document.querySelector(`.tab2Buseo${i}`));
})
selects3.forEach((el,i)=>{
    new Dropdown(document.querySelector(`.tab3Buseo${i}`));
})

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