// var action = function(cb){

// 	setTimeout(function(){
// 		cb('hey');
// 	}, 5000);
// };

// action(function(arg){
// 	console.log(arg);
// });


// var action = function(){
// 	return new Promise(function(resolve, reject){
// 		setTimeout(function(){
// 			// resolve('hey');
// 			reject(new Error('noooo'));
// 		}, 5000);
// 	})
// }

// action()
// 	.then(function(word){
// 		console.log(word);
// 	})
// 	.catch(function(err){
// 		console.log('ERROR ',err);
// 	});


//or
// var promise = action();

// //after sometime
// promise.then(function(word){

// 	console.log(word);
// });

var fs = require('fs');

var readFile = function(){
	return new Promise(function(resolve, reject){
		fs.readFile('./package.json', function(err, file){
			// console.log('reading file');
			return err ? reject(err) : resolve(file.toString());
		});
	});
}

// fs.readFile('./package.json', function(err, file){
// 	// console.log('reading file');
// });

// console.log('After read file');

readFile()
	.then(function(file){
		console.log(file);
	})
	.catch(function(err){
		console.log('Error', err);
	});





