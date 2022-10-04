const controller = {};
const fs = require('fs')
const https = require('https')
const url = require("url");
const path = require("path");


controller.test = (req, res) => {

    console.log('\n')
    console.log('test button pressed')
    console.log('\n')


    res.redirect('/')
}

controller.load = (req, res) => {
    console.log("received: "+ req.file.originalname)

    const object = JSON.parse(req.file.buffer.toString());
    console.log("original count: "+ object.length)
    const obj = object.filter(item => item.biography !== undefined)
    console.log("complete users count: "+ obj.length)

    const postBD = []

    console.log('\n')
    // bajar fotos de perfil
    obj.forEach(element => {
        const link = element.profile_pic_url_hd
        const filename = decodeURIComponent(path.basename(url.parse(link).pathname))
        const mypath = path.join('./thumbs/', filename)


        if (fs.existsSync(mypath)) {
            //file exists
            console.log(filename + ' ya existe')
        } else {
            const dir = fs.createWriteStream(mypath)
            const request = https.get(link, function (response){
                //console.log(response.headers)
                response.pipe(dir)
                console.log('nuevo archivo: ' + filename)
            })
        }
        element.profile_pic_filename = filename

        // links de posts
        if(!element.is_private){
            const posts = element.edge_owner_to_timeline_media.edges
            const images = posts.filter(post => !post.node.is_video).slice(0, 4);
            images.forEach(img => {
                const registro = [element.id, img.node.thumbnail_src];
                postBD.push(registro);
            })
        }

    });
    console.log('\n')

    // subir datos a la base
    //todo manejar upload de id repetido
    const queryArr = [obj.map((item) => [
        item.id,
        item.username,
        item.full_name,
        item.profile_pic_filename,
        item.biography,//.replace(/[\u0800-\uFFFF]/g, ''),
        item.external_url,
        item.edge_followed_by.count,
        item.edge_follow.count,
        item.edge_owner_to_timeline_media.count,
        item.is_private,
        item.edge_mutual_followed_by.count,
        new Date().toISOString().slice(0,10)
    ])];

    req.getConnection((err, connection) => {
        if(err) console.log("Connection error : %s ",err );
        connection.query('INSERT INTO user(id, username, full_name, profile_pic, biography, external_url, followed_by, follow, post_count, is_private, mutual_followed_by, updated) VALUES ? AS foo ON DUPLICATE KEY UPDATE username = foo.username, full_name = foo.full_name, profile_pic = foo.profile_pic, biography = foo.biography, external_url = foo.external_url, followed_by = foo.followed_by, follow = foo.follow, post_count = foo.post_count, is_private = foo.is_private, mutual_followed_by = foo.mutual_followed_by, updated = foo.updated', queryArr, (err, rows) => {
            if(err) console.log("Error loading : %s ",err )
            else console.log(rows.affectedRows  + " user(s) updated");
            //res.redirect('/');
        });
    });

    // guardar links de posts
    req.getConnection((err, connection) => {
        if(err) console.log("Connection error : %s ",err );
        connection.query('INSERT IGNORE INTO post(user_id, post) VALUES ? ', [postBD], (err, rows) => {
            if(err) console.log("Error loading : %s ",err )
            else console.log(rows.affectedRows  + " post link(s) inserted");
            res.redirect('/');
        });
    });


}

controller.download = (req, res) => {
    let filename = req.body.filename;
    if(filename === '') filename = 'users'

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user where accepted = 1 and exported = 0', (err, users) => {
            if (err) res.json(err);
            const usersOutput = []
            users.forEach(user => {
                usersOutput.push({id: user.id, username: user.username, full_name: user.full_name, profile_pic_url: 'file:///'+user.profile_pic, is_verified: false, followed_by_viewer: false, requested_by_viewer: false})
            });
            console.log(usersOutput)

            const json = JSON.stringify(usersOutput, null, 2)
            res.attachment(filename+'.txt')
            res.type('txt')
            // mark accepted users as already exported
            conn.query('UPDATE user SET exported = 1 WHERE accepted = 1 and exported = 0', (err, result) => {
                if (err) res.json(err);
                // send file
                res.send(json)
                console.log(result.affectedRows  + " accepted user(s) set to exported");
            });
        });

    });


}

module.exports = controller;