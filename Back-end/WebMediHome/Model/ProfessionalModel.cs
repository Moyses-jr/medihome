﻿using System.ComponentModel.DataAnnotations;

namespace WebMediHome.Model
{
    public class ProfessionalModel
    {
        [Key]
        public int IdProfessional { get; set; }
        public int IdUser { get; set; }
        public string CNPJ { get; set; } = string.Empty;
        public string CRM { get; set; } = string.Empty;
        public DateOnly ExpirationCRM { get; set; }
        public char ProfessionalType { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateOnly RegisterDate { get; set; }
        public DateOnly RegisterBorn { get; set; }
        public string ?ImagePath { get; set; } = string.Empty;
        public ICollection<ClientProfessionalModel> ClientProfessionals { get; set; } = new List<ClientProfessionalModel>();
    }

}
