import sys
import zipfile
import xml.etree.ElementTree as ET
import os
import shutil

def extract_docx(docx_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    text_content = ""
    image_paths = []
    
    try:
        with zipfile.ZipFile(docx_path) as docx:
            try:
                xml_content = docx.read('word/document.xml')
                tree = ET.fromstring(xml_content)
                ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                paragraphs = []
                for p in tree.findall('.//w:p', ns):
                    texts = [node.text for node in p.findall('.//w:t', ns) if node.text]
                    if texts:
                        paragraphs.append(''.join(texts))
                text_content = '\n'.join(paragraphs)
            except Exception as e:
                text_content = f"Error reading text: {e}"
                
            for file_info in docx.infolist():
                if file_info.filename.startswith('word/media/'):
                    extracted_path = docx.extract(file_info, path=output_dir)
                    base_name = os.path.basename(extracted_path)
                    final_path = os.path.join(output_dir, base_name)
                    if extracted_path != final_path and not os.path.exists(final_path):
                        shutil.move(extracted_path, final_path)
                    if final_path not in image_paths:
                        image_paths.append(final_path)
                    
            word_dir = os.path.join(output_dir, 'word')
            if os.path.exists(word_dir):
                shutil.rmtree(word_dir)
                
    except Exception as e:
        print(f"Error processing docx: {e}")
        return
        
    with open(os.path.join(output_dir, 'text_content.txt'), 'w', encoding='utf-8') as f:
        f.write(text_content)
        
    for p in image_paths:
        print(p)

if __name__ == '__main__':
    extract_docx(sys.argv[1], sys.argv[2])
