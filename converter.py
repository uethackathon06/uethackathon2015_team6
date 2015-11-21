#!/usr/bin/env python
# -*- coding: utf-8 -*-

import 	docx, re , json

document = docx.opendocx("temp.docx")

paratextlist = docx.getdocumenttext(document)
newparatextlist = []
for paratext in paratextlist:
    newparatextlist.append(paratext.encode("utf-8"))
a = '\n'.join(newparatextlist)



# a = "Câu 1: Giới hạn quang điện của mỗi kim loại là:\
# A. Bước sóng của ánh sáng kích thích.\
# B. Bước sóng riêng của kim loại đó.\
# C. Bước sóng giới hạn của ánh sáng kích thích đối với kim loại đó\
# D. Công thoát của electron ở bề mặt kim loại đó. \
# Câu 3: Giả sử hai hạt nhân X và Y có độ hụt khối bằng nhau và số nuclôn của hạt nhân X lớn hơn số nuclôn của hạt nhân Y thì:\
# A. Hạt nhân Y bền vững hơn hạt nhân X.\
# B. Hạt nhân X bền vững hơn hạt nhân Y.\
# C. Năng lượng liên kết riêng của hai hạt nhân bằng nhau.\
# D. Năng lượng liên kết của hạt nhân X lớn hơn năng lượng liên kết của hạt nhân Y.\
# Câu 4: Quá trình phân rã của một chất phóng xạ:\
# A. Phụ thuộc vào chất đó ở dạng đơn chất hay hợp chất \
# B. Phụ thuộc vào nhiệt độ cao hay thấp\
# C. Phụ thuộc vào chất đó ở trạng thái nào (rắn, lỏng, khí) \
# D. Xảy ra như nhau trong mọi điều kiện\
# Câu 5: Trong phản ứng hạt nhân:\
# A. Tổng năng lượng được bảo toàn\
# B. Tổng khối lượng của các hạt được bảo toàn\
# C. Tổng số nơtron được bảo toàn \
# D. Động năng được bảo toàn"

hits = [m.start() for m in re.finditer(r"Câu\b" , a)]
Ahits = [m.start() for m in re.finditer(r"A\." , a)]
Bhits = [m.start() for m in re.finditer(r"B\." , a)]
Chits = [m.start() for m in re.finditer(r"C\." , a)]
Dhits = [m.start() for m in re.finditer(r"D\." , a)]

print hits , Ahits , Bhits , Chits , Dhits

qi = ai = bi = ci = di = 0
nquestion = 0
question = []
Aanswer = []
Banswer = []
Canswer = []
Danswer = []
result = []

while (qi < len(hits)):
	while (hits[qi] >= Ahits[ai]):
		ai+=1
		if (ai == len(Ahits)):
			break

	if (ai == len(Ahits)):
		break;

	while (Ahits[ai] >= Bhits[bi]):
		bi+=1
		if (bi == len(Bhits)):
			break;

	if (bi == len(Bhits)):
		break;

	while (Bhits[bi] >= Chits[ci]):
		ci+=1
		if (ci == len(Chits)):
			break;

	if (ci == len(Chits)):
		break;

	while (Chits[ci] >= Dhits[di]):
		di+=1
		if (di == len(Dhits)):
			break;

	if (di == len(Dhits)):
		break;

	tres = {}

	tres["question"] =  a[hits[qi]:Ahits[ai]].decode("utf-8")
	tres["answer"] = []
	tres["answer"].append(a[Ahits[ai]+2:Bhits[bi]].decode("utf-8"))
	tres["answer"].append(a[Bhits[bi]+2:Chits[ci]].decode("utf-8"))
	tres["answer"].append(a[Chits[ci]+2:Dhits[di]].decode("utf-8"))
	
	while (Dhits[di] >= hits[qi]):
		qi+=1
		if (qi == len(hits)):
			break;

	if (qi == len(hits)):
		tres["answer"].append(a[Dhits[di]+2:len(a)].decode("utf-8"))
	else:
		tres["answer"].append(a[Dhits[di]+2:hits[qi]].decode("utf-8"))

	result.append(tres)

json_data = json.dumps(result, ensure_ascii=False , sort_keys=True, indent=4, separators=(',', ': ')).encode("utf-8")

fo = open("output.txt" , "w")
fo.write(json_data)