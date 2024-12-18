﻿using Microsoft.EntityFrameworkCore;
using WebMediHome.Data;
using WebMediHome.Dto.ProfessionalDTO;
using WebMediHome.Model;

namespace WebMediHome.Services.Professional
{
    public class ProfessionalService : IProfessionalService
    {
        private readonly AppDbContext _dbContext;

        public ProfessionalService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ProfessionalModel>> GetAllProfessionalsAsync()
        {
            return await _dbContext.Professionals.ToListAsync();
        }

        public async Task<ProfessionalModel?> GetProfessionalByIdAsync(int id)
        {
            return await _dbContext.Professionals.FindAsync(id);
        }
        public async Task AddProfessionalAsync(ProfessionalDTO professional)
        {
            string imagePath = null;

            if (professional.Image != null && professional.Image.Length > 0)
            {
                imagePath = await SaveImageAsync(professional.Image);
            }

            var proModel = new ProfessionalModel
            {
                IdUser = professional.IdUser,
                CRM = professional.CRM,
                ExpirationCRM = professional.ExpirationCRM,
                CNPJ = professional.CNPJ,
                PhoneNumber = professional.PhoneNumber,
                RegisterDate = professional.RegisterDate,
                RegisterBorn = professional.RegisterBorn,
                ProfessionalType = professional.ProfessionalType,
                ImagePath = imagePath
            };

            await _dbContext.Professionals.AddAsync(proModel);
            await _dbContext.SaveChangesAsync();
        }
        private async Task<string> SaveImageAsync(IFormFile image)
        {
            var uploadsFolder = @"C:\Users\moyses\Desktop\TCC\medihome\Back-end\images";

            //var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = $"{Guid.NewGuid()}_{image.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return $"/images/{uniqueFileName}";
        }
        public async Task UpdateProfessionalAsync(ProfessionalModel professional)
        {
            var existingProfessional = await _dbContext.Professionals.FindAsync(professional.IdProfessional);
            if (existingProfessional == null)
                throw new KeyNotFoundException("Professional not found");

            // Atualiza os dados do profissional
            existingProfessional.CNPJ = professional.CNPJ;
            existingProfessional.CRM = professional.CRM;
            existingProfessional.ExpirationCRM = professional.ExpirationCRM;
            existingProfessional.ProfessionalType = professional.ProfessionalType;
            existingProfessional.PhoneNumber = professional.PhoneNumber;
            existingProfessional.IsActive = professional.IsActive;

            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteProfessionalAsync(int id)
        {
            var professional = await _dbContext.Professionals.FindAsync(id);
            if (professional == null)
                throw new KeyNotFoundException("Professional not found");

            _dbContext.Professionals.Remove(professional);
            await _dbContext.SaveChangesAsync();
        }
        public async Task AssociateClientAsync(int professionalId, int clientId)
        {
            var relationship = new ClientProfessionalModel
            {
                ProfessionalId = professionalId,
                ClientId = clientId
            };

            if (!_dbContext.ClientsProfessional.Any(cp => cp.ProfessionalId == professionalId && cp.ClientId == clientId))
            {
                _dbContext.ClientsProfessional.Add(relationship);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task DisassociateClientAsync(int professionalId, int clientId)
        {
            var relationship = await _dbContext.ClientsProfessional
                .FirstOrDefaultAsync(cp => cp.ProfessionalId == professionalId && cp.ClientId == clientId);

            if (relationship != null)
            {
                _dbContext.ClientsProfessional.Remove(relationship);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<ICollection<ClientModel>> GetAssociatedClientsAsync(int professionalId)
        {
            return await _dbContext.ClientsProfessional
                .Where(cp => cp.ProfessionalId == professionalId)
                .Select(cp => cp.Client)
                .ToListAsync();
        }

    }
}
