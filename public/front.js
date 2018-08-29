let textarea = document.querySelector('textarea');
textarea.addEventListener("blur", (e)=>{
    let txt = e.target.value;
    if (txt.split('\n')[0] == 'prix quantité') {
        console.log(txt.split('\n')[0]);
        console.log('return');
        return
    }
    let newTxt = '';
    txt = txt.split('\n');
    let end = false;
    txt.forEach(el => {
        let el0 = el.split(' ')[0];
        // console.log('el0');
        // console.log(el0);
        if (el0 == '___TOTAL___'){
            console.log('total return');
            end = true;
        }
        if (!end) {
            if (el0 == 'prix') {
                newTxt += el.split(' ')[1] + ' ';
            }
            if (el0 == 'qté'){
                newTxt += el.split(' ')[1] + '\n';
            }
        }
    });
    console.log('newTxt');
    console.log(newTxt);
    textarea.value = newTxt;
});