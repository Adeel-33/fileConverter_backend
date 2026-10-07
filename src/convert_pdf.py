from pdf2docx import Converter

pdf_file = "temp/input.pdf"
word_file = "temp/output.docx"

converter = Converter(pdf_file)
converter.convert(word_file)
converter.close()

print("Conversion completed")