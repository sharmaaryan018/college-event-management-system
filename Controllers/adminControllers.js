const db = require('../db'); // Assuming you have a db.js for database connection

// Get all events (approved and pending)
exports.getEvents = (req, res) => {
    const query = 'SELECT * FROM events';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        // Render admin page with the events data
        res.render('admin', { events: results });
    });
};

// Approve an event
exports.approveEvent = (req, res) => {
    const eventId = req.params.id;
    const query = 'UPDATE events SET status = "approved" WHERE id = ?';
    db.query(query, [eventId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        // Redirect back to admin events page
        res.redirect('/admin/events');
    });
};

exports.disapprove = (req,res)=>{
    const eventId = req.params.id;
    const query = 'update events set status  = "pending" where id  = ?';
    db.query(query, [eventId],(err,result)=>{
        res.redirect('/admin/events');
    })
}

exports.reject = (req,res)=>{
    const eventID = req.params.id;
    const [reason] = req.body;
    const query = 'delete from events where id = ?';
    db.query(query, [eventId],(err,result)=>{
        res.redirect('/admin/events');
    })
}