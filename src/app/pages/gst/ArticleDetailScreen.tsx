import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Bookmark, Share2, Calendar, Tag } from 'lucide-react';

const articleData = {
  title: 'GST Council Meeting: Key Decisions on Tax Rates and Compliance',
  date: 'February 10, 2026',
  category: 'Latest News',
  tag: 'Breaking',
  image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=1200&h=600&fit=crop',
  content: `
The 52nd GST Council meeting, chaired by the Finance Minister, concluded today with several significant decisions that will impact businesses across various sectors.

## Key Highlights

### 1. Tax Rate Changes

The Council has decided to rationalize tax rates on several items:

- **Healthcare Services**: GST on healthcare services for senior citizens has been reduced from 18% to 12%
- **Electric Vehicles**: Continued exemption on EVs to promote green mobility
- **Real Estate**: Clarification on input tax credit for under-construction properties

### 2. Compliance Simplification

Several measures have been introduced to ease compliance burden:

- Extension of GSTR-3B filing deadline for small taxpayers
- Simplified annual return format for businesses below Rs 2 crore turnover
- Reduced late fee for delayed filing during transition period

### 3. E-Invoice Updates

The threshold for mandatory e-invoicing will be reduced from Rs 10 crore to Rs 5 crore annual turnover, effective from April 1, 2026. This move aims to:

- Increase tax compliance
- Reduce tax evasion
- Streamline invoice matching process

### 4. Input Tax Credit (ITC) Clarifications

The Council has issued fresh guidelines on ITC availment:

- Clear timeline for ITC claim on capital goods
- Simplified reversal mechanism for non-business use
- Better dispute resolution framework

## Impact on Businesses

Small and medium enterprises will benefit from the simplified compliance requirements, while the e-invoice mandate will require businesses to upgrade their systems.

The healthcare sector welcomes the tax rate reduction, which is expected to make services more affordable for senior citizens.

Real estate developers will need to reassess their pricing strategies based on the new ITC clarifications.

## Implementation Timeline

Most decisions will come into effect from April 1, 2026. Businesses are advised to:

1. Review their compliance systems
2. Upgrade software for e-invoicing if required
3. Train staff on new filing procedures
4. Consult with tax professionals for sector-specific impacts

## Expert Opinion

Tax experts view these changes as positive steps toward simplification, though implementation challenges remain. The reduction in e-invoice threshold may require significant investment from medium-sized businesses.

## What's Next?

The next GST Council meeting is scheduled for May 2026, where further rationalization of tax slabs is expected to be discussed.

Stay tuned to GST TODAY TV for detailed analysis and implementation guides on these changes.
  `,
};

export default function ArticleDetailScreen() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        <button
          onClick={() => navigate('/app/news')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-bold ml-2 text-gray-900">Article</h1>
      </header>

      {/* Featured Image */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={articleData.image}
          alt={articleData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-[#DC2626] text-white text-xs font-bold rounded-full">
            {articleData.tag}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="bg-white">
        {/* Title and Meta */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
            {articleData.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {articleData.date}
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              {articleData.category}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors">
              <Bookmark className="w-5 h-5 text-[#2563EB]" />
              <span className="text-gray-900">Bookmark</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors">
              <Share2 className="w-5 h-5 text-[#2563EB]" />
              <span className="text-gray-900">Share</span>
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-4 prose prose-sm max-w-none">
          {articleData.content.split('\n\n').map((paragraph, index) => {
            // Handle headers
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg font-bold text-gray-900 mt-4 mb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            
            // Handle lists
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 my-3">
                  {items.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                    </li>
                  ))}
                </ul>
              );
            }

            // Handle numbered lists
            if (/^\d+\./.test(paragraph)) {
              const items = paragraph.split('\n');
              return (
                <ol key={index} className="list-decimal pl-6 space-y-2 my-3">
                  {items.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      {item.replace(/^\d+\.\s/, '')}
                    </li>
                  ))}
                </ol>
              );
            }

            // Regular paragraphs
            return (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>

      {/* Related Articles */}
      <section className="p-4 bg-gray-50">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Related Articles</h3>
        <div className="space-y-3">
          {[
            {
              id: 2,
              title: 'Understanding Input Tax Credit Rules',
              date: 'Feb 9, 2026',
            },
            {
              id: 3,
              title: 'E-Invoice Implementation Guide',
              date: 'Feb 8, 2026',
            },
          ].map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/app/news/${article.id}`)}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h4 className="font-bold text-gray-900 mb-1">{article.title}</h4>
              <p className="text-xs text-gray-500">{article.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
