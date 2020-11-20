// const stroageInput=document.querySelector(); //stroage에 넣을 것 class이름을 넣으면 된다
// const text=document.querySelector();
// const button=document.querySelector('.btnplusTodo'); //해당 button의 class 넣음

// stroageInput/addEventListener('input',letter => {text.textContent=letter.target.value;})

// const saveToLocalStorage=()=>{localStorage.setItem('todolist',text.textContent)}

// button.addEventListener('click',saveToLocalStorage); //button클릭하면 local로 저장하기
// const storedInput=localStorage.getItem('todolist'); //local에 저장한 것 불러오기
function plusTodo(){
        var text=prompt("오늘의 할일을 입력하세요",null);
        if(text==null){
            //취소한 경우
        }
        else if(text=""){
            //아무것도 입력X
        }
        else{
            //오늘의 계획을 입력한 경우
        }
}
function starClicked(){
        document.getElementById("star").src="/media/full_star.png";
        //하나만 적용된다 ㄱ-
}
function newFolder(){
        alert("폴더 추가하기 버튼을 눌렀습니다");
}