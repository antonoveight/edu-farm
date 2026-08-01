const fs = require('fs');
const path = require('path');

// Raw curated questions based on textbook contents
const newQuestions = {
    grade1: {
        science: [
            {
                q: "Việc làm nào giúp em giữ vệ sinh răng miệng sạch sẽ hằng ngày?",
                a: "Chải răng mỗi ngày 2 lần sáng và tối",
                c: ["Chải răng mỗi ngày 2 lần sáng và tối", "Chỉ chải răng khi ăn kẹo", "Chỉ súc miệng bằng nước", "Không cần chải răng"]
            },
            {
                q: "Tại sao em cần phải rửa tay trước khi ăn và sau khi đi vệ sinh?",
                a: "Để phòng tránh vi khuẩn và bảo vệ sức khoẻ",
                c: ["Để phòng tránh vi khuẩn và bảo vệ sức khoẻ", "Để tay có mùi thơm", "Để tay ướt dễ cầm thức ăn", "Để được bố mẹ khen"]
            },
            {
                q: "Khi đi bộ trên đường phố, em nên đi ở đâu để đảm bảo an toàn?",
                a: "Đi trên vỉa hè",
                c: ["Đi trên vỉa hè", "Đi sát dải phân cách", "Đi dưới lòng đường", "Đi chéo qua ngã tư"]
            },
            {
                q: "Việc nào em nên làm để giúp đỡ bố mẹ khi ở nhà?",
                a: "Dọn dẹp đồ chơi gọn gàng sau khi chơi",
                c: ["Dọn dẹp đồ chơi gọn gàng sau khi chơi", "Vứt đồ dùng bừa bãi", "Đòi bố mẹ mua thêm đồ chơi", "Chỉ ngồi xem tivi"]
            }
        ],
        tech: [
            {
                q: "Trong dãy số từ 1 đến 10, số nào lớn nhất?",
                a: "10",
                c: ["10", "1", "5", "9"]
            },
            {
                q: "Thiết bị nào của máy tính dùng để gõ chữ và số?",
                a: "Bàn phím",
                c: ["Bàn phím", "Chuột", "Màn hình", "Thân máy"]
            },
            {
                q: "Khi muốn di chuyển con trỏ trên màn hình máy tính, em cần sử dụng thiết bị nào?",
                a: "Chuột máy tính",
                c: ["Chuột máy tính", "Bàn phím", "Loa", "Máy in"]
            }
        ],
        vietnamese: [
            {
                q: "Câu nào dưới đây viết đúng quy tắc viết hoa đầu câu?",
                a: "Bé thích trồng cây xanh.",
                c: ["Bé thích trồng cây xanh.", "bé thích trồng cây xanh.", "Bé thích Trồng Cây xanh.", "bé Thích Trồng Cây Xanh."]
            },
            {
                q: "Tiếng nào có chứa vần 'oanh'?",
                a: "Doanh",
                c: ["Doanh", "Bánh", "Chanh", "Hành"]
            },
            {
                q: "Từ nào chỉ hoạt động viết đúng chính tả?",
                a: "Chạy nhảy",
                c: ["Chạy nhảy", "Trạy nhảy", "Chạy nhải", "Trạy nhải"]
            }
        ]
    },
    grade2: {
        science: [
            {
                q: "Quê hương của bài dân ca 'Màu xanh quê hương' là của dân tộc nào?",
                a: "Dân tộc Khmer",
                c: ["Dân tộc Khmer", "Dân tộc Kinh", "Dân tộc Tày", "Dân tộc Thái"]
            },
            {
                q: "Việc làm nào thể hiện tình yêu thương và sự quan tâm của em đối với ông bà khi ở xa?",
                a: "Gọi điện hỏi thăm sức khỏe ông bà thường xuyên",
                c: ["Gọi điện hỏi thăm sức khỏe ông bà thường xuyên", "Chờ ông bà gọi điện trước", "Không bao giờ hỏi thăm", "Chỉ hỏi thăm khi cần tiền"]
            },
            {
                q: "Em nên làm gì khi đi tham quan các di tích lịch sử hoặc cảnh đẹp quê hương?",
                a: "Giữ vệ sinh chung và không xả rác bừa bãi",
                c: ["Giữ vệ sinh chung và không xả rác bừa bãi", "Khắc tên lên cột đá di tích", "Hái hoa bẻ cành trang trí", "Chạy nhảy làm đổ vỡ đồ vật"]
            },
            {
                q: "Cơ quan nào trong cơ thể giúp chúng ta hít thở không khí?",
                a: "Phổi",
                c: ["Phổi", "Tim", "Dạ dày", "Ruột"]
            }
        ],
        tech: [
            {
                q: "Phép tính nào có kết quả bằng 15?",
                a: "8 + 7",
                c: ["8 + 7", "9 + 5", "6 + 8", "7 + 7"]
            },
            {
                q: "Bộ phận nào của máy tính hiển thị hình ảnh và văn bản để em quan sát?",
                a: "Màn hình",
                c: ["Màn hình", "Bàn phím", "Thân máy", "Chuột"]
            },
            {
                q: "Đâu là một hành vi an toàn khi sử dụng máy tính?",
                a: "Ngồi thẳng lưng và giữ khoảng cách hợp lý với màn hình",
                c: ["Ngồi thẳng lưng và giữ khoảng cách hợp lý với màn hình", "Ngồi sát mắt vào màn hình", "Vừa ăn uống vừa bấm bàn phím", "Tự ý tháo dây cắm điện của máy tính"]
            }
        ],
        vietnamese: [
            {
                q: "Từ nào là từ chỉ người trong câu: 'Bác sĩ đang khám bệnh cho bệnh nhân'?",
                a: "Bác sĩ, bệnh nhân",
                c: ["Bác sĩ, bệnh nhân", "Khám bệnh", "Cho", "Đang"]
            },
            {
                q: "Cặp từ nào dưới đây là cặp từ trái nghĩa?",
                a: "Chăm chỉ - Lười biếng",
                c: ["Chăm chỉ - Lười biếng", "Siêng năng - Cần cù", "Hiền lành - Tốt bụng", "Thông minh - Sáng dạ"]
            },
            {
                q: "Câu nào dưới đây là câu nêu hoạt động?",
                a: "Đàn chim đang bay về tổ.",
                c: ["Đàn chim đang bay về tổ.", "Bầu trời xanh bao la.", "Hoa hồng rất thơm.", "Em là học sinh lớp 2."]
            }
        ]
    },
    grade3: {
        science: [
            {
                q: "Gia đình họ hàng bên nội gồm những ai?",
                a: "Cô, chú, bác bên bố",
                c: ["Cô, chú, bác bên bố", "Cậu, dì bên mẹ", "Bác bên mẹ", "Dì dượng bên mẹ"]
            },
            {
                q: "Để tìm hiểu về truyền thống lịch sử của trường học, em có thể thu thập thông tin qua đâu?",
                a: "Phòng truyền thống và cựu học sinh",
                c: ["Phòng truyền thống và cựu học sinh", "Sân bóng đá", "Nhà xe", "Cổng trường"]
            },
            {
                q: "Đâu là biện pháp bảo vệ nguồn nước sạch xung quanh nơi em sống?",
                a: "Không vứt rác, xác động vật xuống sông, hồ",
                c: ["Không vứt rác, xác động vật xuống sông, hồ", "Đổ nước thải sinh hoạt ra ngõ", "Sử dụng nhiều túi nilon", "Vứt pin cũ ra vườn"]
            },
            {
                q: "Bộ phận nào của cây có chức năng hút nước và chất dinh dưỡng từ đất?",
                a: "Rễ cây",
                c: ["Rễ cây", "Thân cây", "Lá cây", "Hoa"]
            }
        ],
        tech: [
            {
                q: "Thiết bị nào dưới đây là thiết bị vào của máy tính?",
                a: "Bàn phím và chuột",
                c: ["Bàn phím và chuột", "Màn hình và máy in", "Loa và tai nghe", "Thân máy và nguồn điện"]
            },
            {
                q: "Khi sử dụng Internet, em cần làm gì để bảo vệ thông tin cá nhân của mình?",
                a: "Không chia sẻ mật khẩu và thông tin gia đình cho người lạ",
                c: ["Không chia sẻ mật khẩu và thông tin gia đình cho người lạ", "Chia sẻ địa chỉ nhà công khai", "Cho người lạ mượn tài khoản học tập", "Đăng ảnh cá nhân kèm số điện thoại"]
            },
            {
                q: "Phép nhân nào có kết quả bằng 24?",
                a: "6 x 4",
                c: ["6 x 4", "5 x 5", "7 x 3", "8 x 2"]
            }
        ],
        vietnamese: [
            {
                q: "Bộ phận in đậm trả lời cho câu hỏi nào: 'Mùa hè, hoa phượng vĩ nở đỏ rực góc sân'?",
                a: "Làm gì?",
                c: ["Làm gì?", "Là gì?", "Như thế nào?", "Ở đâu?"]
            },
            {
                q: "Từ nào viết sai chính tả trong câu: 'Bé rất thích ăn bánh chưng và uống nước chà'?",
                a: "nước chà",
                c: ["nước chà", "bánh chưng", "rất thích", "ăn bánh"]
            },
            {
                q: "Từ nào cùng nghĩa với từ 'Tổ quốc'?",
                a: "Đất nước",
                c: ["Đất nước", "Thành phố", "Làng quê", "Núi rừng"]
            }
        ]
    },
    grade4: {
        science: [
            {
                q: "Nước có những tính chất vật lý nào sau đây?",
                a: "Không màu, không mùi, không vị, không có hình dạng nhất định",
                c: ["Không màu, không mùi, không vị, không có hình dạng nhất định", "Có màu xanh, mùi thơm, vị ngọt", "Có dạng hình tròn, vị mặn", "Không thấm qua vải, chỉ chảy từ dưới lên"]
            },
            {
                q: "Phương pháp nào giúp loại bỏ các chất không tan ra khỏi nước đục?",
                a: "Lọc nước",
                c: ["Lọc nước", "Đun sôi nước", "Khử trùng bằng hóa chất", "Để ngoài nắng"]
            },
            {
                q: "Đâu là nguyên nhân chính dẫn đến ô nhiễm nguồn nước sạch?",
                a: "Xả nước thải sinh hoạt và công nghiệp chưa qua xử lý ra sông, hồ",
                c: ["Xả nước thải sinh hoạt và công nghiệp chưa qua xử lý ra sông, hồ", "Trồng nhiều cây xanh ven hồ", "Sử dụng bình lọc nước", "Dọn dẹp vệ sinh ao giếng"]
            },
            {
                q: "Lịch sử ghi nhận triều đại nào đã có công dời đô từ Hoa Lư về Thăng Long?",
                a: "Triều Lý",
                c: ["Triều Lý", "Triều Trần", "Triều Lê", "Triều Nguyễn"]
            }
        ],
        tech: [
            {
                q: "Thư mục trong máy tính dùng để làm gì?",
                a: "Lưu trữ và sắp xếp các tệp tin một cách khoa học",
                c: ["Lưu trữ và sắp xếp các tệp tin một cách khoa học", "Tăng tốc độ gõ phím", "Hiển thị video ca nhạc", "Thay đổi hình nền màn hình"]
            },
            {
                q: "Để chọn nhiều tệp tin liên tiếp trong thư mục, em nhấn giữ phím nào khi chọn?",
                a: "Phím Shift",
                c: ["Phím Shift", "Phím Ctrl", "Phím Alt", "Phím Tab"]
            },
            {
                q: "Phép chia nào có số dư bằng 2?",
                a: "17 chia 5",
                c: ["17 chia 5", "20 chia 4", "15 chia 3", "18 chia 4"]
            }
        ],
        vietnamese: [
            {
                q: "Dấu gạch ngang (-) đặt ở đầu dòng trong đoạn đối thoại có tác dụng gì?",
                a: "Đánh dấu lời nói trực tiếp của nhân vật",
                c: ["Đánh dấu lời nói trực tiếp của nhân vật", "Đánh dấu phần chú thích", "Nối các từ trong câu ghép", "Kết thúc một câu kể"]
            },
            {
                q: "Thành ngữ nào nói về lòng tự trọng và trung thực?",
                a: "Đói cho sạch, rách cho thơm",
                c: ["Đói cho sạch, rách cho thơm", "Uống nước nhớ nguồn", "Kề vai sát cánh", "Lên thác xuống ghềnh"]
            },
            {
                q: "Trong câu: 'Ánh trăng sáng vằng vặc chiếu xuống dòng sông', từ nào là chủ ngữ?",
                a: "Ánh trăng",
                c: ["Ánh trăng", "Sáng vằng vặc", "Chiếu xuống", "Dòng sông"]
            }
        ]
    },
    grade5: {
        science: [
            {
                q: "Muốn phòng tránh tai nạn giao thông đường bộ, học sinh cần làm gì?",
                a: "Học và tuân thủ nghiêm chỉnh luật an toàn giao thông",
                c: ["Học và tuân thủ nghiêm chỉnh luật an toàn giao thông", "Đi xe đạp dàn hàng ba hàng bốn", "Vượt đèn đỏ khi đường vắng", "Chạy sang đường không quan sát"]
            },
            {
                q: "Tài nguyên thiên nhiên nào là tài nguyên vô hạn nếu biết bảo vệ và khai thác hợp lý?",
                a: "Năng lượng gió và năng lượng mặt trời",
                c: ["Năng lượng gió và năng lượng mặt trời", "Dầu mỏ", "Than đá", "Quặng sắt"]
            },
            {
                q: "Tác nhân chính nào gây ra hiệu ứng nhà kính và biến đổi khí hậu toàn cầu?",
                a: "Khí thải carbon dioxide (CO2) từ hoạt động công nghiệp và giao thông",
                c: ["Khí thải carbon dioxide (CO2) từ hoạt động công nghiệp và giao thông", "Việc trồng thêm nhiều rừng xanh", "Sử dụng năng lượng mặt trời", "Hơi nước tự nhiên từ đại dương"]
            }
        ],
        tech: [
            {
                q: "James Watt (Giêm Oát) là nhà sáng chế nổi tiếng thế giới với phát minh vĩ đại nào?",
                a: "Động cơ hơi nước",
                c: ["Động cơ hơi nước", "Bóng đèn điện", "Ô tô chạy xăng", "Điện thoại di động"]
            },
            {
                q: "Thomas Edison (Tô-mát Ê-đi-xơn) nổi tiếng với phát minh nào làm thay đổi lịch sử chiếu sáng của nhân loại?",
                a: "Bóng đèn điện sợi đốt",
                c: ["Bóng đèn điện sợi đốt", "Động cơ hơi nước", "Máy in", "Máy bay"]
            },
            {
                q: "Khi sử dụng điện thoại thông minh, thói quen nào có thể gây nguy hiểm nghiêm trọng đến tính mạng?",
                a: "Vừa sạc pin vừa sử dụng điện thoại",
                c: ["Vừa sạc pin vừa sử dụng điện thoại", "Chỉ nhắn tin khi cần thiết", "Giới hạn thời gian sử dụng", "Tắt wifi khi đi ngủ"]
            },
            {
                q: "Đâu là một quy tắc ứng xử lịch sự khi giao tiếp qua điện thoại?",
                a: "Chào hỏi, xưng danh và nêu mục đích của cuộc gọi",
                c: ["Chào hỏi, xưng danh và nêu mục đích của cuộc gọi", "Nói trống không không xưng tên", "Bất ngờ gác máy không chào", "Nói thật to và gào thét vào mic"]
            }
        ],
        vietnamese: [
            {
                q: "Từ nào đồng nghĩa với từ 'thanh bình'?",
                a: "Hòa bình, yên tĩnh",
                c: ["Hòa bình, yên tĩnh", "Ồn ào, náo nhiệt", "Chiến tranh, xung đột", "Nhộn nhịp, vui tươi"]
            },
            {
                q: "Câu ghép nào dưới đây thể hiện mối quan hệ nguyên nhân - kết quả?",
                a: "Vì trời mưa to nên đường phố bị ngập nước.",
                c: ["Vì trời mưa to nên đường phố bị ngập nước.", "Tuy nhà nghèo nhưng Lan vẫn học giỏi.", "Hễ gió thổi mạnh là diều bay cao.", "Không những Nam học giỏi mà bạn ấy còn đá bóng hay."]
            },
            {
                q: "Trong câu: 'Những cánh buồm trắng muốt đang lướt sóng ra khơi', từ nào là vị ngữ?",
                a: "đang lướt sóng ra khơi",
                c: ["đang lướt sóng ra khơi", "Những cánh buồm", "buồm trắng muốt", "lướt sóng"]
            }
        ]
    }
};

const subjectMapping = {
    'vietnamese': 'vietnamese.txt',
    'science': 'science.txt',
    'tech': 'tech.txt'
};

const jsonMapping = {
    'vietnamese': 'viet.json',
    'science': 'science.json',
    'tech': 'tech.json'
};

// 1. Read existing questions from TXT files, add new curated questions, write back
for (let g = 1; g <= 5; g++) {
    const gradeKey = 'grade' + g;
    const textbookDir = path.join('textbooks', gradeKey);
    const dataDir = path.join('src', 'data', gradeKey);

    Object.entries(subjectMapping).forEach(([subKey, txtFileName]) => {
        const txtPath = path.join(textbookDir, txtFileName);
        const jsonPath = path.join(dataDir, jsonMapping[subKey]);

        // Read what is currently in txt
        let questions = [];
        const seen = new Set();

        const parseTextbookFile = (filePath) => {
            if (!fs.existsSync(filePath)) return [];
            const content = fs.readFileSync(filePath, 'utf8');
            const blocks = content.split(/\n\s*\n|\n\s*---\s*\n/);
            const list = [];
            for (let block of blocks) {
                if (!block.trim()) continue;
                const lines = block.split('\n');
                let q = '';
                let a = '';
                let c = [];
                for (let line of lines) {
                    line = line.trim();
                    if (line.startsWith('Q:')) {
                        q = line.substring(2).trim();
                    } else if (line.startsWith('A:')) {
                        a = line.substring(2).trim();
                    } else if (line.startsWith('C:')) {
                        c = line.substring(2).split(',').map(item => item.trim());
                    }
                }
                if (q && a) {
                    list.push({ q, a, c: c.length ? c : [a] });
                }
            }
            return list;
        };

        const existingList = parseTextbookFile(txtPath);
        existingList.forEach(item => {
            const norm = item.q.trim().toLowerCase();
            if (!seen.has(norm)) {
                seen.add(norm);
                questions.push(item);
            }
        });

        // Add new curated questions
        const newList = newQuestions[gradeKey][subKey] || [];
        newList.forEach(item => {
            const norm = item.q.trim().toLowerCase();
            if (!seen.has(norm)) {
                seen.add(norm);
                questions.push(item);
            }
        });

        // Write back to TXT
        let txtOutput = '';
        questions.forEach(item => {
            txtOutput += 'Q: ' + item.q + '\n';
            txtOutput += 'A: ' + item.a + '\n';
            txtOutput += 'C: ' + item.c.join(', ') + '\n\n';
        });
        fs.writeFileSync(txtPath, txtOutput.trim() + '\n', 'utf8');

        // Compile and write to JSON directly in src/data
        fs.writeFileSync(jsonPath, JSON.stringify(questions, null, 2), 'utf8');
        console.log('Successfully updated Grade ' + g + ' ' + subKey + ': Total ' + questions.length + ' questions.');
    });
}
