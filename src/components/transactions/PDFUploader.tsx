import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";

const PDFUploader = () => {
  const [uploading, setUploading] = useState(false);
  const { uploadPDF } = useTransactions();
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const success = await uploadPDF(file);
      if (success) {
        toast({
          title: "PDF importé avec succès",
          description: "Les transactions ont été mises à jour.",
        });
      } else {
        throw new Error("Échec de l'upload");
      }
    } catch (error) {
      toast({
        title: "Erreur lors de l'import",
        description: "Une erreur est survenue lors de l'import du PDF.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="pdf-upload"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      <label htmlFor="pdf-upload">
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={uploading}
          asChild
        >
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            {uploading ? "Import en cours..." : "Importer PDF"}
          </div>
        </Button>
      </label>
    </div>
  );
};

export default PDFUploader;