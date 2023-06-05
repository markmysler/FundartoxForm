class ParPregResp {
	constructor(data) {
		this.data = data;
	}
}

class Encuestado {
	constructor(answerList = []) {
		this.answerList = answerList;
	}
	addAnswer(data) {
		this.answerList.push(data);
	}
}

class Encuestador {
	constructor(nombre, dataEncuestados = []) {
		this.nombre = nombre;
		this.dataEncuestados = dataEncuestados;
	}
	addEncuestado(encuestado) {
		this.dataEncuestados.push(encuestado);
	}
}

const newEncuestado = new Encuestado();
for (let i = 1; i < 10; i++) {
	const newParPregRes = new ParPregResp([
		`Texto preg ${i}`,
		`Respuesta preg ${i}`,
	]);
	newEncuestado.addAnswer(newParPregRes.data);
}

const newEncuestador = new Encuestador("Mark");
newEncuestador.addEncuestado(newEncuestado);
console.log(newEncuestador);
