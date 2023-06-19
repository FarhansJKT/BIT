while (remaining != 0) {
                    let obj = {
                        gift_id: giftId,
                        live_id: liveId,
                        num: 10,
                        is_delay: 0,
                        csrf_token: csrfToken
                    }
                    if (remaining % 10 != 0) {
                        obj.num = remaining % 10
                        remaining -= remaining % 10
                    } else {
                        remaining -= 10
                    }
                    const body = Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key])).join("&")
                    await fetch("https://www.showroom-live.com/api/live/gifting_free", { method, headers, body })
                    await waitTime(600);
                }
