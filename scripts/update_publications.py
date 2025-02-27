import os
import re
import time
from scholarly import scholarly
from bs4 import BeautifulSoup

# Your Google Scholar ID - replace with your actual ID
SCHOLAR_ID = "XuuYEyAAAAAJ"

def get_publications():
    """Fetch publications from Google Scholar"""
    print("Fetching publications from Google Scholar...")
    try:
        author = scholarly.search_author_id(SCHOLAR_ID)
        scholarly.fill(author, sections=['publications'])
        publications = author['publications']
        
        # Sort by year in descending order
        sorted_pubs = sorted(publications, key=lambda x: x.get('bib', {}).get('pub_year', 0), reverse=True)
        return sorted_pubs
    except Exception as e:
        print(f"Error fetching publications: {e}")
        return []

def format_publication_html(pub):
    """Format a publication as HTML for the website"""
    bib = pub.get('bib', {})
    title = bib.get('title', 'Untitled')
    authors = bib.get('author', '').replace(' and ', ', ')
    journal = bib.get('journal', bib.get('venue', ''))
    year = bib.get('pub_year', '')
    
    # Check if it's a journal article or a conference paper
    is_journal = 'journal' in journal.lower() or any(word in journal.lower() for word in ['proceedings', 'conference', 'symposium'])
    
    html = f"""
    <div class="publication-item" data-aos="fade-up">
        <h4>{title}</h4>
        <p class="authors">{authors} ({year})</p>
    """
    
    if is_journal:
        html += f'<p class="journal"><em>{journal}</em></p>'
    else:
        html += f'<p class="conference">{journal}</p>'
    
    html += '</div>'
    return html

def update_publications_section(publications):
    """Update the publications section in the HTML file"""
    html_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'index.html')
    
    if not os.path.exists(html_path):
        print(f"Error: File {html_path} not found")
        return False
    
    with open(html_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    # Find the journal articles section
    journal_section = soup.select_one('.publications-content h3:contains("Journal Articles") + .publication-list')
    if not journal_section:
        print("Journal articles section not found in HTML")
        return False
    
    # Generate new publication items HTML
    journal_pubs = [pub for pub in publications if 'journal' in pub.get('bib', {}).get('journal', '').lower()]
    journal_html = ''.join([format_publication_html(pub) for pub in journal_pubs])
    
    # Replace the content of the journal section
    journal_section.clear()
    journal_section.append(BeautifulSoup(journal_html, 'html.parser'))
    
    # Save the updated HTML
    with open(html_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))
    
    print(f"Updated {len(journal_pubs)} journal publications in {html_path}")
    return True

if __name__ == "__main__":
    publications = get_publications()
    if publications:
        update_publications_section(publications)
    else:
        print("No publications found or error occurred")
