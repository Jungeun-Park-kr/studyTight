const stroageInput=document.querySelector(); //stroage에 넣을 것 class이름을 넣으면 된다
const text=document.querySelector();
const button=document.querySelector('.btnplusTodo'); //해당 button의 class 넣음

stroageInput/addEventListener('input',letter => {text.textContent=letter.target.value;})

const saveToLocalStorage=()=>{localStorage.setItem('todolist',text.textContent)}

button.addEventListener('click',saveToLocalStorage); //button클릭하면 local로 저장하기
const storedInput=localStorage.getItem('todolist'); //local에 저장한 것 불러오기