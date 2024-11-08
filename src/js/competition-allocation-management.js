
new Dropdown(document.querySelector(`.cptKind`)); // 대회종류
new Datepicker(document.querySelector(`.dpApplyStart`)); // 신청기간 시작일
new Datepicker(document.querySelector(`.dpApplyEnd`)); // 신청기간 종료일
new Datepicker(document.querySelector(`.dpGameStart`)); // 대회기간 시작일
new Datepicker(document.querySelector(`.dpGameEnd`)); // 대회기간 종료일

/**
 * 부서 추가/제거
 *  수정시 기존 데이터 불러올때, 셀렉트는 selectBuseo 를 동일하게 가지고, 
 *  순번대로 selectBox0,selectBox1... 클래스를 부여한다.
 **/
const selects = document.querySelectorAll('.selectBuseo') ?? []; // 부서

selects.forEach((el,i)=>{
    new Dropdown(document.querySelector(`.selectBox${i}`));
})

let selectCnt = 1;

$('.addBuOp').on('click',(e)=>{
    const cloneDom = $(e.target).siblings('.selectBox').first().clone();

    cloneDom.removeClass();
    cloneDom.addClass(`selectBox selectBuseo selectBox${selectCnt}`);
    cloneDom.find('select').val('').attr('name',`select${selectCnt}val`);
    cloneDom.find('.customSelect-options').html('')
    $(e.target).before(cloneDom);

    new Dropdown(document.querySelector(`.selectBox${selectCnt}`));

    $(`.selectBox${selectCnt} .removeSc`).on('click',(e)=>{
        if($('.selectBuseo').length ===1) return;
        $(e.target).parent().remove();

        deleteBusuFn();
      
    });

    selectCnt++;
});

$('.removeSc').on('click',function(){
    if($('.selectBuseo').length ===1) return;

    $(this).parent().remove();

    deleteBusuFn();
})


function deleteBusuFn (){
    $.each($('.selectBuseo'),function(i,el){
        $(el).removeClass();
        
        $(el).addClass(`selectBox selectBuseo selectBox${i}`);
        $(el).find('select').attr('name',`select${i}val`);
        
        selectCnt = i+1;
    });

}


/**
 * 지원대상 추가/제거
 *  수정시 기존 데이터 불러올때, 셀렉트는 supplyTargetSl 를 동일하게 가지고, 
 *  순번대로 supplyTargetSl0,supplyTargetSl1... 클래스를 부여한다.
 **/
const targetSlts = document.querySelectorAll('.supplyTargetSl') ?? []; // 부서

targetSlts.forEach((el,i)=>{
    new Dropdown(document.querySelector(`.supplyTargetSl${i}`));
})


let targetSltCnt = 1;

const targetSltColumn = 'supplySlt'; // 컬럼명 수정
const targetInputColumn = 'input';// 컬럼명 수정

$('.addTarget').on('click',(e)=>{
    const cloneDom = $(e.target).siblings('.line').first().clone();

    const selectTarget = cloneDom.find('.selectBox');
    selectTarget.removeClass();
    selectTarget.addClass(`selectBox supplyTargetSl supplyTargetSl${targetSltCnt}`);
    selectTarget.find('select').val('').attr('name',targetSltColumn + targetSltCnt);
    cloneDom.find('.inputBox').val('').attr('name',targetInputColumn + targetSltCnt);
    selectTarget.find('.customSelect-options').html('')
    $(e.target).before(cloneDom);

    new Dropdown(document.querySelector(`.supplyTargetSl${targetSltCnt}`));

    $(`.supplyTargetSl${targetSltCnt}`).siblings('.removeLine').on('click',(e)=>{
        if($('.supplyTargetSl').length === 1) return;
        $(e.target).parent().remove();

        deleteSupplyTargetOp();
      
    });

    targetSltCnt++;
});


$('.removeLine').on('click',function(){
    if($('.supplyTargetSl').length === 1) return;

    $(this).parent().remove();

    deleteSupplyTargetOp();
})


function deleteSupplyTargetOp (){
    $.each($('.supplyTargetSl'),function(i,el){
        $(el).removeClass();
        
        $(el).addClass(`selectBox supplyTargetSl supplyTargetSl${i}`);
        $(el).find('select').attr('name',targetSltColumn +i);
        $(el).siblings('.inputBox').attr('name',targetInputColumn + i);
        
        targetSltCnt = i+1;
    });

}

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