import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Lead {
  name: string;
  title: string;
  company: string;
  summary: string;
  [key: string]: string; // Allow for additional columns
}

interface ParseResult {
  data: Lead[];
  meta: {
    fields: string[];
  };
}

interface GeneratedEmail {
  subject: string;
  body: string;
  leadName: string;
}

export default function LeadUploader() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmails, setGeneratedEmails] = useState<GeneratedEmail[]>([]);
  const [formData, setFormData] = useState({
    niche: '',
    role: '',
    offer: '',
    tone: 'professional'
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('');
    const file = acceptedFiles[0];

    if (file) {
      Papa.parse<Lead>(file, {
        header: true,
        complete: (results) => {
          // Validate required columns
          const requiredColumns = ['name', 'title', 'company', 'summary'];
          const headers = results.meta.fields || [];
          const missingColumns = requiredColumns.filter(col => !headers.includes(col));

          if (missingColumns.length > 0) {
            setError(`Missing required columns: ${missingColumns.join(', ')}`);
            return;
          }

          // Transform data to match our Lead interface
          const parsedLeads = results.data.map((row) => {
            const { name, title, company, summary, ...rest } = row;
            return {
              name: name || '',
              title: title || '',
              company: company || '',
              summary: summary || '',
              ...rest // Include any additional columns
            };
          });

          setLeads(parsedLeads);
        },
        error: (error: Error) => {
          setError(`Error parsing CSV: ${error.message}`);
        }
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateEmails = async () => {
    if (!formData.niche || !formData.role || !formData.offer) {
      setError('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post('/api/generate-emails', {
        leads,
        inputs: formData
      });

      setGeneratedEmails(response.data.emails);
    } catch (error) {
      setError('Failed to generate emails. Please try again.');
      console.error('Error generating emails:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportCSV = () => {
    if (generatedEmails.length === 0) return;

    // Create CSV content
    const headers = ['Lead Name', 'Company', 'Subject', 'Email Body'];
    const rows = generatedEmails.map(email => {
      const lead = leads.find(l => l.name === email.leadName);
      return [
        email.leadName,
        lead?.company || '',
        email.subject,
        email.body.replace(/\n/g, ' ') // Replace newlines with spaces
      ];
    });

    // Convert to CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'autocold_emails.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-sm text-gray-600">
            {isDragActive ? (
              <p>Drop the CSV file here ...</p>
            ) : (
              <p>
                Drag and drop a CSV file here, or{' '}
                <span className="text-primary font-medium">click to select</span>
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500">Only .csv files are accepted</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Data Preview */}
      {leads.length > 0 && (
        <div className="space-y-6">
          {/* Email Generation Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="niche">Target Niche</Label>
              <Input
                id="niche"
                value={formData.niche}
                onChange={(e) => handleInputChange('niche', e.target.value)}
                placeholder="e.g., SaaS, Healthcare"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="e.g., Sales Manager"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="offer">Your Offer</Label>
              <Input
                id="offer"
                value={formData.offer}
                onChange={(e) => handleInputChange('offer', e.target.value)}
                placeholder="What are you offering?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Email Tone</Label>
              <Select
                value={formData.tone}
                onValueChange={(value: string) => handleInputChange('tone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Preview ({leads.length} leads)
            </h3>
            <Button
              onClick={handleGenerateEmails}
              disabled={isGenerating}
              className="bg-primary hover:bg-secondary text-white"
            >
              {isGenerating ? 'Generating...' : 'Generate Emails'}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.company}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lead.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Generated Emails */}
      {generatedEmails.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Generated Emails</h3>
            <Button
              onClick={handleExportCSV}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Download Emails as CSV
            </Button>
          </div>
          <div className="space-y-6">
            {generatedEmails.map((email, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  To: {email.leadName}
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Subject: </span>
                    <span className="text-sm text-gray-900">{email.subject}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-500">Body: </span>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap mt-2">
                      {email.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 