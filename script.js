$(document).ready(function() {
	// Carrega os dados do arquivo JSON
	$.getJSON('participantes.json', function(data) {
	  var listaParticipantes_ativa = $('.cfg-ativa');
	  var listaParticipantes_reserva = $('.cfg-reserva');
	  var listaParticipantes_cg = $('.cg');
  
	  // Itera sobre cada objeto do array de participantes e cria o HTML correspondente
	  $.each(data, function(index, participante) {
		if(participante.opcao === "Ativa"){
			var html_cfgativa = 
			/*'<li class="' + participante.taxonomia + '">' +*/
				'<div class="card">' +
					'<img src="/fotos/' + participante.foto + '" alt="Foto do Participante">' +
					'<div class="card_nome">'+
						'<p>'+'Alu Mil '+'</p>'+
						'<p>'+participante.nome+'</p>'+
					'</div>'+
					'<div class="taxonomia">'+
						'<p>' + 'CFG-ATIVA' + '</p>' +
					'</div>'+
				'</div>';
			/*'</li>';*/
	
			// Adiciona o HTML ao final da lista de participantes
			listaParticipantes_ativa.append(html_cfgativa);
		}
		if(participante.opcao === "Reserva"){
			var html_cfgreserva = 
				'<div class="card">' +
					'<img src="/fotos/' + participante.foto + '" alt="Foto do Participante">' +
					'<div class="card_nome">'+
						'<p>'+'Alu Civ '+'</p>'+
						'<p>'+participante.nome+'</p>'+
					'</div>'+
					'<div class="taxonomia">'+
						'<p>' + 'CFG-RESERVA' + '</p>' +
					'</div>'+
				'</div>';
			// Adiciona o HTML ao final da lista de participantes
			listaParticipantes_reserva.append(html_cfgreserva);
		}
		if(participante.curso === "CG"){
			var html_cg = 
				'<div class="card">' +
					'<img src="/fotos/' + participante.foto + '" alt="Foto do Participante">' +
					'<div class="card_nome">'+
						'<p>'+'1º Ten'+'</p>'+
						'<p>'+participante.nome+'</p>'+
					'</div>'+
					'<div class="taxonomia">'+
						'<p>' + 'CG ' + '</p>' +
					'</div>'+
				'</div>';
			// Adiciona o HTML ao final da lista de participantes
			listaParticipantes_cg.append(html_cg);
		}
	  });
	  // Seleciona todos os cards e adiciona o evento de clique
	  $('.card').on('click', function() {
		$(this).toggleClass('selecionado'); // Adiciona ou remove a classe 'selecionado'
		});
	});
	
	// Filtra a lista de participantes de acordo com a taxonomia selecionada
	$('#taxonomia').on('change', function() {
		var taxonomia = $(this).val(); // Obtém a taxonomia selecionada
		
		// Mostra todos os participantes se a opção "Todos" for selecionada
		if (taxonomia == 'todos') {
			$('#lista-participantes li').show();
		} else {
			// Esconde os participantes que não fazem parte da taxonomia selecionada
			$('#lista-participantes li:not(.' + taxonomia + ')').hide();
			// Mostra os participantes que fazem parte da taxonomia selecionada
			$('#lista-participantes li.' + taxonomia).show();
		}
	});
	
	// Exporta os dados em CSV quando o botão é clicado
	$('#exportar-csv').on('click', function() {
		
		var csv = 'data:text/csv;charset=utf-8,';
		var participantes = [];
		var naoParticipantes = [];
		var dados = "participante,taxonomia\n";
		
		// Obtém a lista de participantes e percorre cada card
		$('#lista-participantes li .card').each(function() {
				var nome = $(this).find('.card_nome p').text();
				/*var foto = $(this).find('.card img').attr('src');*/
				var taxonomia = $(this).find('.taxonomia p').text();
				var selecionado = $(this).hasClass('selecionado');
				
				// Adiciona o participante na lista correspondente
				if (selecionado) {
					participantes.push([nome, taxonomia]);
				} else {
					naoParticipantes.push([nome, taxonomia]);
				}
		});
		function obterCabecalhoCSV() {
			const cabecalho = ["Data e Hora", "Local"]; // Crie um array com os nomes dos campos
			const dataHora = $("#data-hora").val().replace('T', ' '); // Obtenha o valor do campo de data e hora
			const local = $("#local").val(); // Obtenha o valor do campo de local
			cabecalhoCSV = cabecalho.join(";") + "\n"; // Concatene os nomes dos campos separados por vírgula e adicione uma quebra de linha
			valoresCSV = dataHora + ";" + local + "\n"; // Concatene os valores separados por vírgula e adicione uma quebra de linha
			return cabecalhoCSV + valoresCSV; // Retorne a linha de cabeçalho e os valores
		}
		csv += obterCabecalhoCSV()
		
		// Adiciona a lista de participantes no CSV
		csv += '\n\nParticipantes\n';
		participantes.forEach(function(participante) {
			csv += '\n' + participante[0] + ';' + participante[1] + '\n';
		});
		
		// Adiciona a lista de não participantes no CSV
		csv += '\n\nNão participantes\n';
		naoParticipantes.forEach(function(naoParticipante) {
			csv += '\n' + naoParticipante[0] + ';' + naoParticipante[1] + '\n';
		});

		
		
		// Cria um elemento de link para fazer o download do arquivo
		var link = document.createElement('a');
	link.setAttribute('href', encodeURI(csv));
		link.setAttribute('download', 'participantes.csv');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	});
  });
