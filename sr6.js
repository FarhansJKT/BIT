const axios = require('axios');

const roomId = "303895"; // Ganti dengan ID ruangan yang ingin Anda jumlahkan komentarnya

async function getLiveCommentsCount() {
  try {
    // Kirim permintaan POST ke API
    const response = await axios.post('https://www.showroom-live.com/api/live/post_live_comment', {
      room_id: roomId,
      offset: 0,
      limit: 100,
      sort: 'asc',
    });

    // Menghitung jumlah total komentar
    const comments = response.data.comments;
    const totalComments = comments.reduce((total, comment) => total + comment.count, 0);

    console.log('Total Komentar:', totalComments);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

getLiveCommentsCount();
