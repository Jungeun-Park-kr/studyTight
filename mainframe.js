// const stroageInput=document.querySelector(); //stroage에 넣을 것 class이름을 넣으면 된다
// const text=document.querySelector();
// const button=document.querySelector('.btnplusTodo'); //해당 button의 class 넣음

// stroageInput/addEventListener('input',letter => {text.textContent=letter.target.value;})

// const saveToLocalStorage=()=>{localStorage.setItem('todolist',text.textContent)}

// button.addEventListener('click',saveToLocalStorage); //button클릭하면 local로 저장하기
// const storedInput=localStorage.getItem('todolist'); //local에 저장한 것 불러오기
function plusTodo(){
        var text=window.prompt("오늘의 할일을 입력하세요","ex) 웹 공부하기");
        var wrap=document.getElementById('todolist');
        if(text!=null){
               var new_todo=document.createElement("input");
               new_todo.setAttribute("type","checkbox");
               new_todo.setAttribute("id","new_todo");
               new_todo.setAttribute("value",text);

               var new_label=document.createElement("label");
               new_label.setAttribute('for','new_todo') //체크박스 아이디
               wrap.appendChild(new_todo);
               new_todo.appendChild(document.createTextNode(text))
              
                        //일단 안된다 ,,
        }
}
function starClicked(){
        document.getElementById("star").src="/media/full_star.png";
        //하나만 적용된다 ㄱ-
}
function newFolder(){
        alert("폴더 추가하기 버튼을 눌렀습니다");
}