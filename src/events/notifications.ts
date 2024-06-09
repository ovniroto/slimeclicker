import Notifications from "../modules/notifications";

const notifications = new Notifications();

// Close notification
$('body').on('click', '#notifications .close', function(event) {
    let id: string = $(event.target).parent()[0].id;
    notifications.delete(id);
});

$('body').on('click', '#notifications .close-all', function(event) {
    notifications.deleteAll();
});