   DevTinder Api
  ## Auth router 
   --> post /signup
   --> post /login
   --> post /logout
  ## Prifile Router
   -->Get /profile/view
   -->patch /profile / update
   -->patch /profile / update password
  ## connection request router
   -->post /request/interested/:userId
   -->post /request/ignored/:userId
   -->post /request/review/accepted/:requestId
   -->post /request/review/rejected/:requestId
   ## User router
   -->get/user/connection
   -->Get /user/request

   -->Get /user/feed //-gets you the profiles of other users on the platform



status -->ignored(left swipe),interested(right swipe),accepted,rejected,