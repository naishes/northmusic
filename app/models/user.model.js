module.exports = {
	list(callback) {
		var sql = 'SELECT * from user';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	

	read(username, callback) {
		var sql = "SELECT * from user where username=?";	
		global.connection.query(sql, [username], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	listparticipante(callback) {
		var sql = 'SELECT * from participantes';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},


	readparticipante(user_participante, callback) {
		var sql = "SELECT * from participantes where user_participante=?";	
		global.connection.query(sql, [user_participante], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	createparticipante(data, callback) {
		var sql = "INSERT INTO participantes (nome_participante, email_participante, nif_participante, password_participante, user_participante) VALUES (?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome_participante, data.email_participante, data.nif_participante, data.password_participante, data.user_participante], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});


    },
	

	updateparticipante(user_participante, data, callback) {
		var sql = "UPDATE participantes SET nome_participante=?, email_participante=?, nif_participante=? WHERE user_participante=?"; 
		global.connection.query(
			sql, [data.nome_participante, data.email_participante, data.nif_participante, user_participante ], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	removeparticipante(user_participante, callback) {
		var sql = "DELETE from participantes WHERE user_participante=?"; 
		global.connection.query(sql, [user_participante], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	//New
	areValidCredentials(username, password, callback) {
		var sql = "SELECT password FROM user WHERE username=?";
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			if (rows.length == 1 && rows[0].password === password) {
				callback(true);
			}else{
				callback(false);
			}
		});
	}
};
