// 첨부파일

// fileArr로 파일 관리
let fileArr = []

$(".fileBox .btn-file").click(function() {
    $("#file").click();
})

$(".fileBox .btn-plus").on('click',(e)=>{
    const cloneDom = $(".fileBox ul li:first-child").clone();
    let num = $(".fileBox ul li").length
    cloneDom.find(".inputBox").val('').attr('name',`file${num}`)
    cloneDom.appendTo($(".fileBox ul"))

    $("#file").attr('multiple', true)

    cloneDom.find(".remove").click(function(){
        fileArr = Array.from(fileArr).filter(el => el.name != cloneDom.find(".inputBox").val())
        cloneDom.remove();
        if($(".fileBox ul li").length == 1) {
            $("#file").attr('multiple', false)
        }
    })
})

$("#file").on('change', function() {
    let maxFile = $(".fileBox ul li").length;
    if (this.files.length > maxFile) {
        alert('최대 ' + maxFile + '개의 파일만 선택할 수 있습니다.');
        $(this).val('');
        return
    }

    let inputArr = $(".fileBox ul li .inputBox")
    let fileNameArr = getFileNames(this)

    for(let i = 0; i < inputArr.length; i++) {
        inputArr[i].value = fileNameArr[i] || "";
    }

    fileArr = this.files
})

$(".fileBox ul li:first-child .remove").click(function() {
    let input = $(".fileBox ul li:first-child .inputBox-default")
    fileArr = Array.from(fileArr).filter(el => el.name != input.val())
    input.val("");
})

function getFileNames(arr) {
    var files = arr.files;
    var fileNames = [];

    for (var i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
    }

    return fileNames;
}