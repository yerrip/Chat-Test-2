 $(document).ready(function() {
             console.log("document loaded");

             jQuery(function($) {
                         var socket = io.connect('http://localhost:8888');
                         var $messageform = $('.send-message');
                         var $messageBox = $('#message');
                         var $chat = $('#chat');

                         $messageForm.submit(function(e) {
                             e.preventDefault();
                             socket.emit('send message', $messageBox.val());
                             $messageBox.val('');
                         });

                         socket.on('new message', function(data) {
                             $chat.append(data = "<br/>");
                             
							  });
							  
                             $('#form').submit(function() {
                                 socket.emit('news', $('#message').val());
                                 $('#message').val('');
                                 return false;
                             });

                             var socket = io.connect('http://localhost:8888');
                             socket.on('news', function(data) {
                                 console.log(data);
                                 $('#message').append($('<li>').text(data));
                                 socket.emit('my other event', {
                                     my: 'data'
                                 });

                             });

                             $(function() {
                                 var socket = io();
                                 $('#form').submit(function() {
                                     socket.emit('chat message', $('#message').val());
                                     $('#message').val('');
                                     return false;
                                 });
                             });
                         });
                    });