const controllerList = {};

controllerList.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user where accepted = 0 and review = 0 and discarded = 0 and exported = 0 order by last_click desc, updated asc LIMIT 20', (err, users) => {
            if (err) {
                res.json(err);
            }
            conn.query('SELECT * FROM post where user_id = ?', [req.query.view], (err, links) => {
                if (err) {
                    res.json(err);
                }
                res.render('users', {
                    data: users,
                    posts: links,
                    home: true,
                    resetButton: false,
                    deleteButton: false
                });
            });
        });
    });
};

controllerList.listAccepted = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user where accepted = 1 and exported = 0 order by last_click desc, updated asc', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('result', {
                data: users,
                exportFile: true,
                home: false,
                resetButton: true,
                deleteButton: false
            });
        });
    });
};

controllerList.listReview = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user where review = 1 and exported = 0 order by last_click desc, updated asc', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('result', {
                data: users,
                exportFile: false,
                home: false,
                resetButton: true,
                deleteButton: false
            });
        });
    });
};

controllerList.listDiscarded = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user where discarded = 1 and exported = 0 order by last_click desc, updated asc', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('result', {
                data: users,
                exportFile: false,
                home: false,
                resetButton: true,
                deleteButton: true
            });
        });
    });
};

controllerList.accept = (req, res) => {
    const { id } = req.params;
    const datetime = new Date();
    req.getConnection((err, connection) => {
        connection.query('UPDATE user SET accepted = 1, last_click = ? WHERE id = ?', [datetime, id], (err, rows) => {
            res.redirect('/');
        });
    });
}

controllerList.review = (req, res) => {
    const { id } = req.params;
    const datetime = new Date();
    req.getConnection((err, connection) => {
        connection.query('UPDATE user SET review = 1, last_click = ? WHERE id = ?', [datetime, id], (err, rows) => {
            res.redirect('/');
        });
    });
}

controllerList.discard = (req, res) => {
    const { id } = req.params;
    const datetime = new Date();
    req.getConnection((err, connection) => {
        connection.query('UPDATE user SET discarded = 1, last_click = ? WHERE id = ?', [datetime, id], (err, rows) => {
            res.redirect('/');
        });
    });
}

controllerList.reset = (req, res) => {
    const { id } = req.params;
    const datetime = new Date();
    req.getConnection((err, connection) => {
        connection.query('UPDATE user SET accepted = 0, review = 0, discarded = 0, last_click = ? WHERE id = ?', [datetime, id], (err, rows) => {
            res.redirect('/');
        });
    });
}

controllerList.delete = (req, res) => {
    const { id } = req.params;
    const datetime = new Date();
    req.getConnection((err, connection) => {
        connection.query('UPDATE user SET exported = 1, last_click = ? WHERE id = ?', [datetime, id], (err, rows) => {
            res.redirect('/discarded');
        });
    });
}


module.exports = controllerList;