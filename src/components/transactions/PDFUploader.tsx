import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const PDFUploader = () => {
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        toast({
          title: "PDF chargé avec succès",
          description: `Le fichier ${file.name} a été chargé.`,
        });
        // Ici, vous pourriez ajouter la logique pour traiter le PDF
      } else {
        toast({
          title: "Erreur de format",
          description: "Veuillez sélectionner un fichier PDF.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="pdf-upload"
      />
      <label htmlFor="pdf-upload">
        <Button 
          variant="default" 
          className="cursor-pointer bg-finance-primary hover:bg-finance-primary/90 text-white"
        >
          <Upload className="mr-2 h-4 w-4" />
          Importer un PDF
        </Button>
      </label>
    </div>
  );
};

export default PDFUploader;