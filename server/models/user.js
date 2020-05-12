const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    photo:{
        type:String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADICAMAAADhopxgAAAARVBMVEX///+cnJyhoaH29vb6+vqlpaW9vb3Hx8fb29u2traoqKje3t7l5eWrq6vX19f5+fnv7+/ExMTR0dHGxsaysrLw8PDj4+NRyjSdAAAGKElEQVR4nO2dB2LCMAxFm032hPsftYTRkEHiIevb0HcCPrZlrcg/P//88486QVElcZwOZRRl5ZDGbZc3IfpHGSI4tYPvbZGlSfFhquu8Lze1TqRdg/6VZOTpgdgHUfIJmpt+ex9vU1YB+gfrcTrayWtih5dZQa7LkhXluiq5UJc70tZoAXLUrZbcK1GO1iBDHunqvZKe0TJECQTv3SP8Cq1EjCKj0XsldsHjrMjkXimtN9dhTKn3uq1PaEX7BHqX0RYJWtMeAd3xnWjRqt7TUNxGa2K0rncY0nu9ke001oVMHPgBis+m1nfEwl1txF5NWGerw8GoXs/r0AoXEPsbG9gVPSXG9XqeTV5mwaDXK+0x1YFJAz1hj8tFFP8eYssx7pj0er4dSeuGS+/V40JrvcG1oUds2NQ5o14vw1vq0KxLuQTvYrJZrAfo3G3ArBceN2lXGKTBepjsC4xeYo6gYQnyFIfmsjrvQbrU3Cb6DtDB5ImSluDuYpYweE0EE2w+r7NNAdILMVkjKLPFGja84oMEo3Y0KkqsYXpB3hZsR6P2NMKtfAKJIOiL/eIg+nuARxhziIFHGHOIkUcYcohN10f3AXQzYSKlJ/wRUwjVC7BajAWWLUp2wSesYH4zjcnuTLDneXCh0h32JABnzXAL9ggRLZj9Isb6HYDwARkrjbA3qmEdLYBgVMbyCbtvCdbr9dyCv26Fv+4Mf52V/rp7+Os8LXTwcOEWzN++M4c9Wvq6ePiC1cuf8QDntAZ2wWDfElBr4e2iXQL4jAl7EQN6ALBmGtCcBmrSupPx68UGiJDGJeQhhoxCQB5iSH8p8BBDjjAy6QHqp+1hgkHfPcD2NH9x+AHKu4R9Ho9q5IF95gEKEQGh4RNM6hI4VwzSjYf75OEHk46HTvQA9PL42E+I+b0t8BfE7BEEevAB8wfiFszkYTbUFgwB4M0DWDDmgdXdsmKQB6dHbcXEJUa7hR9qcYMtLgZGDXOYLmMfPcNjgidqsmhMLcsEMfTIkhkM5XGLJsSNkE6V3iKy5wDfMXwb+1bcwDPM9jGxdykJYNJUWzkevzanGB4TbhOaCpysXN8bZs6xRQ7HChOKLQiBdyC/nSLUHBpRctrWj8GOYaV7NJTJeXvm7+5A95iH7c94/FHRbOvBPnfyHQHBIrvy+NCDi26iK7bfWs0JE519XdoYLBwRKEsuXTFWS9QkOyt3JOhkz3LqstwbRSy+zFlnWyJHibBKRTRHre1uswRhkeymB/y4csfLEKW+dFtvTGdpUn3Q0q4IivxUdUnfJl1XnS7uvSAe9Kx2pkWntzrf8/m8ojFrBg0pHh4z17/+eFURtsjnvywlzxujf6/uYR74DF/TVyXDQb68WHhA6HieZ3LMH+R5uY59jMc6V9cb3dbh8gML5qcQt7KxJk/WRmawZMwQBG/cRGPmczPbHbGZruJtg4OZO/Jd4tdn8kh3e6Rb8o0WvP88iqdKftDcQJxsDLu9yJJD8XFPVkm4004HCRPz51ioBy0m+hmX4xK76V4X0eJgqr/KYSVUpMqM3k4S82gGvbJu0In2ug0GPRC54m+pbr4amVKNuQ496eYzv1XxsJtOsuBqyt9R+rpBNhXZJArlZTNNEY1q4STqBTXXRa9WgjNyHWs1zPpDctq9P+qiizXqjVlNrrfWb2Tw0yQ/Ly+RoClyLa136D/+IOw5i8ohjeM+ToeMrgGGuiKFfdRBAOIv9KBzd8Qg3dRMb4TrQRmloWdYCkG4qdEDDgUh29QOHOA7RJua/QthZYg2tfU30gTJpgbPr5SDYlOjxypLQbCpHbHQT7Q39Rk9Cl4W3U3thMvxiuamhr58p4ZeDz168r0KOolq45+MmkAniemMjzVDvQbg5AJrjEYIXYiCt1DN2jrmc0woToF0doFVvQ9nF9jzIpX6Wu2aU/mKSrXJoTB4jYKDGbi8wCoOptML7MnPoXJ8geUdTNzoaCrkljh0fYFlT7GjXvQMKUPtYhy8RGacnDO1hj18ia4A9PNgNIi7W057lRPiHvUnmKwR4aDpE0zWiOh7Hx9hsm4Ipj7QTzjSIZb6qNE/kxChVk+HMx0rhGprn2KybqxDiF+ESnPSzMRbpQAAAABJRU5ErkJggg=="
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})



mongoose.model("User",userSchema)