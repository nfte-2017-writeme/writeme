function displayOne() {
	var data = JSON.parse(fetch("https://nfte-2017-writeme.github.io/writeme/mocks/endpoints/qna/index.json").response);

	console.log(data[0].question);

	var num = Math.floor(Math.random() * (data.length - 1));

	console.log(num);

	document.write(data[num].question);
}

/*
function load() {
	var mydata = JSON.parse(data);
	document.write(mydata(num).question);
}
var z = Object.keys(data)
alert(i);
for i in len(mydata):
    if i == "question":
        something+=1
*/
